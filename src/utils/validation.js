/**
 * validation.js - Validation utilities for wallet operations
 */

/**
 * Validate BAP/NFX address format
 * @param {string} address - Address to validate
 * @returns {boolean} True if valid
 */
export const isValidAddress = (address) => {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // Remove whitespace
  address = address.trim();

  // Basic validation - should be enhanced with actual BAP address validation
  // Typical blockchain addresses are 40-42 characters (hex)
  if (address.length < 20 || address.length > 100) {
    return false;
  }

  // Check if it's a valid hex string (require at least one character after optional 0x)
  const hexRegex = /^(0x)?[0-9a-fA-F]+$/;
  if (!hexRegex.test(address)) {
    return false;
  }

  // Remove '0x' prefix if present for further validation
  const cleanAddress = address.toLowerCase().replace(/^0x/, '');
  
  // Ensure it's not just '0x' or empty after removing prefix
  if (cleanAddress.length === 0) {
    return false;
  }

  // TODO: Implement BAP-specific address format validation
  // TODO: Add checksum validation (e.g., EIP-55 style or BAP-specific)
  // Example: verify checksum by comparing mixed-case address

  return true;
};

/**
 * Validate amount for transaction
 * @param {string|number} amount - Amount to validate
 * @param {number} maxAmount - Maximum available amount
 * @returns {object} { valid: boolean, error: string }
 */
export const validateAmount = (amount, maxAmount = Infinity) => {
  // Convert to number
  const numAmount = parseFloat(amount);

  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return { valid: false, error: 'Invalid amount format' };
  }

  // Check if positive
  if (numAmount <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }

  // Check if not exceeding max
  if (numAmount > maxAmount) {
    return { valid: false, error: 'Insufficient balance' };
  }

  // Check for too many decimal places (max 8 for most cryptocurrencies)
  const decimalPart = amount.toString().split('.')[1];
  if (decimalPart && decimalPart.length > 8) {
    return { valid: false, error: 'Too many decimal places' };
  }

  return { valid: true, error: null };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { valid: boolean, strength: string, error: string }
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, strength: 'none', error: 'Password is required' };
  }

  // Minimum length check
  if (password.length < 8) {
    return { 
      valid: false, 
      strength: 'weak', 
      error: 'Password must be at least 8 characters' 
    };
  }

  // Check for various character types
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let strength = 'weak';
  let strengthScore = 0;

  if (hasUpperCase) strengthScore++;
  if (hasLowerCase) strengthScore++;
  if (hasNumbers) strengthScore++;
  if (hasSpecialChar) strengthScore++;

  if (strengthScore >= 3 && password.length >= 12) {
    strength = 'strong';
  } else if (strengthScore >= 2 && password.length >= 8) {
    strength = 'medium';
  }

  return { 
    valid: strengthScore >= 2, 
    strength, 
    error: strengthScore < 2 ? 'Password is too weak' : null 
  };
};

/**
 * Format address for display
 * @param {string} address - Full address
 * @param {number} startChars - Characters to show at start
 * @param {number} endChars - Characters to show at end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export default {
  isValidAddress,
  validateAmount,
  validatePassword,
  formatAddress
};
