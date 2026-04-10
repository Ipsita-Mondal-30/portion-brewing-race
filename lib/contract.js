import { ethers } from "ethers";

/**
 * Your actual deployed contract ABI
 */
const POTION_RACE_ABI = [
  {
    inputs: [],
    name: "brewPotion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "declareWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "joinRace",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyIngredients",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "playerList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "players",
    outputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "uint256", name: "ingredient1", type: "uint256" },
      { internalType: "uint256", name: "ingredient2", type: "uint256" },
      { internalType: "uint256", name: "power", type: "uint256" },
      { internalType: "bool", name: "submitted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * Your deployed contract address
 */
export const CONTRACT_ADDRESS =
  "0x956D1F926f8C0D49799CD160313b774b58c2dC6e";

/**
 * Get contract instance
 */
export function getPotionRaceContract(signerOrProvider) {
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    POTION_RACE_ABI,
    signerOrProvider
  );
}

/** Sepolia testnet chain id (hex) */
export const SEPOLIA_CHAIN_ID = "0xaa36a7";

/**
 * Ensure the injected wallet is on Sepolia before contract writes.
 * Shows an alert and requests a network switch if needed.
 */
export async function checkNetwork() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No wallet found.");
  }

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const isSepolia = String(chainId).toLowerCase() === SEPOLIA_CHAIN_ID.toLowerCase();

  if (!isSepolia) {
    alert("Switch to Sepolia Network!");

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
  }
}

/**
 * Send joinRace tx (MetaMask prompts here). Caller should await tx.wait().
 * @param {import("ethers").Signer} signer
 * @returns {Promise<import("ethers").ContractTransactionResponse>}
 */
export async function joinRace(signer) {
  const contract = getPotionRaceContract(signer);
  return contract.joinRace();
}

/**
 * Send brewPotion tx. Caller should await tx.wait().
 * @param {import("ethers").Signer} signer
 * @returns {Promise<import("ethers").ContractTransactionResponse>}
 */
export async function brewPotion(signer) {
  const contract = getPotionRaceContract(signer);
  return contract.brewPotion();
}

/**
 * Get Winner
 */
export async function getWinner(provider) {
  const contract = getPotionRaceContract(provider);
  return contract.winner();
}

/**
 * Get Player Ingredients
 */
export async function getMyIngredients(signer) {
  const contract = getPotionRaceContract(signer);
  return contract.getMyIngredients();
}

/** Max indices to scan for playerList(i) when no length getter exists */
const LEADERBOARD_SCAN_CAP = 128;

/**
 * Normalize ethers Result from players(address) to a plain object.
 * @param {string} walletAddress
 * @param {import("ethers").Result} raw
 */
function normalizePlayerStruct(walletAddress, raw) {
  const addr = String(raw.addr ?? raw[0] ?? walletAddress).toLowerCase();
  const ing1 = raw.ingredient1 ?? raw[1];
  const ing2 = raw.ingredient2 ?? raw[2];
  const power = raw.power ?? raw[3];
  const submitted = Boolean(raw.submitted ?? raw[4]);
  return {
    address: addr,
    score: typeof power === "bigint" ? power : BigInt(power?.toString?.() ?? "0"),
    ingredient1: typeof ing1 === "bigint" ? ing1 : BigInt(ing1?.toString?.() ?? "0"),
    ingredient2: typeof ing2 === "bigint" ? ing2 : BigInt(ing2?.toString?.() ?? "0"),
    submitted,
  };
}

const AVATAR_POOL = ["🧙‍♂️", "🧪", "👑", "⚡", "🔮", "🌿", "💎", "⚗️"];

function avatarForAddress(addr) {
  const h = parseInt(addr.slice(2, 4) || "0", 16);
  return AVATAR_POOL[h % AVATAR_POOL.length];
}

/**
 * Fetch all registered racers from playerList + players(), sort by power (desc).
 * @param {import("ethers").Provider} provider
 */
export async function fetchLeaderboardFromChain(provider) {
  const contract = getPotionRaceContract(provider);
  /** @type {{ address: string, score: bigint, submitted: boolean, ingredient1: bigint, ingredient2: bigint }[]} */
  const rows = [];

  for (let i = 0; i < LEADERBOARD_SCAN_CAP; i++) {
    let listAddr;
    try {
      listAddr = await contract.playerList(i);
    } catch {
      break;
    }
    if (!listAddr || ethers.getAddress(listAddr) === ethers.ZeroAddress) {
      break;
    }

    const listAddrStr = ethers.getAddress(listAddr).toLowerCase();
    const raw = await contract.players(listAddr);
    const row = normalizePlayerStruct(listAddrStr, raw);
    rows.push(row);
  }

  rows.sort((a, b) => (a.score === b.score ? 0 : a.score < b.score ? 1 : -1));

  return rows.map((row, idx) => ({
    rank: idx + 1,
    address: row.address,
    score: row.score,
    submitted: row.submitted,
    ingredient1: row.ingredient1,
    ingredient2: row.ingredient2,
    avatar: avatarForAddress(row.address),
    displayName: `${row.address.slice(0, 6)}…${row.address.slice(-4)}`,
  }));
}

/**
 * Error formatter (UI friendly)
 * Unwraps MetaMask / EIP-1193 errors hidden behind ethers "could not coalesce error".
 */
export function formatContractError(err) {
  if (!err || typeof err !== "object") {
    return "Something went wrong.";
  }

  const providerRpc =
    "error" in err && err.error && typeof err.error === "object" ? err.error : null;
  if (providerRpc) {
    if (providerRpc.code === -32002) {
      return "MetaMask has a connect request pending or stuck (you may not see it). Open the MetaMask extension from the toolbar and approve or reject it. If there is no popup: MetaMask → ⋮ → Connected sites → remove this site (e.g. localhost), reload the page, then tap Connect once.";
    }
    if (typeof providerRpc.message === "string" && providerRpc.message.trim()) {
      return providerRpc.message;
    }
  }

  if ("shortMessage" in err) {
    const sm = String(/** @type {{ shortMessage: unknown }} */ (err).shortMessage);
    if (sm && sm !== "could not coalesce error") {
      return sm;
    }
  }

  if ("reason" in err && typeof /** @type {{ reason?: unknown }} */ (err).reason === "string") {
    const r = String(err.reason).trim();
    if (r) return r;
  }

  if ("message" in err) {
    const m = String(/** @type {{ message: unknown }} */ (err).message);
    if (m && !m.toLowerCase().includes("could not coalesce error")) {
      return m;
    }
  }

  return "Something went wrong.";
}