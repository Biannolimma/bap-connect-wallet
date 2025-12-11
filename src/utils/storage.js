/**
 * storage.js - Secure storage utilities
 * Handles encrypted storage of sensitive wallet data
 */

const STORAGE_PREFIX = 'bap_wallet_';
const ENCRYPTED_KEYS = ['privateKey', 'mnemonic', 'password'];

/**
 * Simple encryption (placeholder - use proper encryption in production)
 * In production, use Web Crypto API or a library like crypto-js
 * @param {string} data - Data to encrypt
 * @param {string} key - Encryption key
 * @returns {string} Encrypted data
 */
const simpleEncrypt = (data, key = 'bap-default-key') => {
  // This is a PLACEHOLDER - implement proper encryption in production!
  // TODO: Use Web Crypto API: crypto.subtle.encrypt() with AES-GCM
  // Example: const encrypted = await crypto.subtle.encrypt(
  //   { name: "AES-GCM", iv: iv },
  //   cryptoKey,
  //   encoder.encode(data)
  // );
  // WARNING: This is NOT secure - only for development/demo purposes
  return btoa(JSON.stringify({ data, timestamp: Date.now() }));
};

/**
 * Simple decryption (placeholder - use proper decryption in production)
 * @param {string} encryptedData - Data to decrypt
 * @param {string} key - Decryption key
 * @returns {string} Decrypted data
 */
const simpleDecrypt = (encryptedData, key = 'bap-default-key') => {
  // This is a PLACEHOLDER - implement proper decryption in production!
  // TODO: Use Web Crypto API: crypto.subtle.decrypt() with AES-GCM
  // Example: const decrypted = await crypto.subtle.decrypt(
  //   { name: "AES-GCM", iv: iv },
  //   cryptoKey,
  //   encryptedData
  // );
  // WARNING: This is NOT secure - only for development/demo purposes
  try {
    const decoded = atob(encryptedData);
    const parsed = JSON.parse(decoded);
    return parsed.data;
  } catch {
    return null;
  }
};

/**
 * Store data in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @param {boolean} encrypt - Whether to encrypt the value
 */
export const setItem = (key, value, encrypt = false) => {
  try {
    const storageKey = STORAGE_PREFIX + key;
    let dataToStore = JSON.stringify(value);

    if (encrypt || ENCRYPTED_KEYS.includes(key)) {
      dataToStore = simpleEncrypt(dataToStore);
    }

    localStorage.setItem(storageKey, dataToStore);
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

/**
 * Retrieve data from localStorage
 * @param {string} key - Storage key
 * @param {boolean} decrypt - Whether to decrypt the value
 * @returns {any} Retrieved value
 */
export const getItem = (key, decrypt = false) => {
  try {
    const storageKey = STORAGE_PREFIX + key;
    let data = localStorage.getItem(storageKey);

    if (!data) return null;

    if (decrypt || ENCRYPTED_KEYS.includes(key)) {
      data = simpleDecrypt(data);
      if (!data) return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Retrieval error:', error);
    return null;
  }
};

/**
 * Remove item from storage
 * @param {string} key - Storage key
 */
export const removeItem = (key) => {
  const storageKey = STORAGE_PREFIX + key;
  localStorage.removeItem(storageKey);
};

/**
 * Clear all wallet data from storage
 */
export const clearAll = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Check if storage is available
 * @returns {boolean} True if storage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get storage usage
 * @returns {object} Storage usage info
 */
export const getStorageInfo = () => {
  let totalSize = 0;
  let itemCount = 0;

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(STORAGE_PREFIX)) {
      const item = localStorage.getItem(key);
      totalSize += item ? item.length : 0;
      itemCount++;
    }
  });

  return {
    itemCount,
    totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2)
  };
};

export default {
  setItem,
  getItem,
  removeItem,
  clearAll,
  isStorageAvailable,
  getStorageInfo
};
