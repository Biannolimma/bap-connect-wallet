/**
 * wallet.js - Wallet utility functions
 * Core wallet operations and helpers
 */

/**
 * Generate a random wallet address (for demo purposes)
 * In production, this should use proper cryptographic methods
 * @returns {string} Wallet address
 */
export const generateWalletAddress = () => {
  // This is a placeholder - use proper key generation in production
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

/**
 * Format balance with appropriate decimal places
 * @param {number} balance - Balance amount
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted balance
 */
export const formatBalance = (balance, decimals = 4) => {
  if (typeof balance !== 'number' || isNaN(balance)) {
    return '0.00';
  }
  return balance.toFixed(decimals);
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

/**
 * Calculate transaction fee
 * @param {number} amount - Transaction amount
 * @param {number} feeRate - Fee rate (percentage)
 * @returns {number} Fee amount
 */
export const calculateFee = (amount, feeRate = 0.001) => {
  return amount * feeRate;
};

/**
 * Convert token amount to fiat value
 * @param {number} amount - Token amount
 * @param {number} price - Token price in fiat
 * @returns {number} Fiat value
 */
export const toFiatValue = (amount, price) => {
  return amount * price;
};

/**
 * Store wallet data securely in localStorage
 * Note: This is a basic implementation. In production, use proper encryption
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export const secureStore = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(`bap-wallet-${key}`, jsonData);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

/**
 * Retrieve wallet data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Retrieved data
 */
export const secureRetrieve = (key) => {
  try {
    const jsonData = localStorage.getItem(`bap-wallet-${key}`);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

/**
 * Clear all wallet data
 */
export const clearWalletData = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('bap-wallet-')) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Generate a unique transaction ID
 * @returns {string} Transaction ID
 */
export const generateTransactionId = () => {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

/**
 * Parse transaction status from chain
 * @param {object} txData - Transaction data from chain
 * @returns {string} Status (pending, confirmed, failed)
 */
export const parseTransactionStatus = (txData) => {
  if (!txData) return 'unknown';
  if (txData.confirmations === 0) return 'pending';
  if (txData.confirmations > 0 && txData.status === true) return 'confirmed';
  if (txData.status === false) return 'failed';
  return 'unknown';
};

export default {
  generateWalletAddress,
  formatBalance,
  formatLargeNumber,
  calculateFee,
  toFiatValue,
  secureStore,
  secureRetrieve,
  clearWalletData,
  generateTransactionId,
  parseTransactionStatus
};
