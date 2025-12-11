import React, { useState, useEffect } from 'react';
import '../styles/Send.css';

/**
 * Send Component
 * Form for sending tokens to another address
 */
const Send = ({ tokens, balance, onSend, i18n }) => {
  const [formData, setFormData] = useState({
    recipientAddress: '',
    amount: '',
    selectedToken: 'BAP',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0.001);

  // Validate recipient address
  const validateAddress = (address) => {
    // Basic validation - should be enhanced with actual BAP address validation
    if (!address) return false;
    if (address.length < 20) return false;
    return true;
  };

  // Validate amount
  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    
    const availableBalance = balance?.[formData.selectedToken] || 0;
    if (numAmount > availableBalance) return false;
    
    return true;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    
    if (!validateAddress(formData.recipientAddress)) {
      newErrors.recipientAddress = i18n?.send?.invalidAddress || 'Invalid address';
    }
    
    if (!validateAmount(formData.amount)) {
      newErrors.amount = i18n?.send?.insufficientBalance || 'Insufficient balance';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit transaction
    setIsSubmitting(true);
    try {
      await onSend?.(formData);
      // Reset form on success
      setFormData({
        recipientAddress: '',
        amount: '',
        selectedToken: 'BAP',
      });
    } catch (error) {
      console.error('Send error:', error);
      setErrors({ submit: i18n?.send?.error || 'Error sending transaction' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableBalance = balance?.[formData.selectedToken] || 0;
  const total = parseFloat(formData.amount || 0) + estimatedFee;

  return (
    <div className="send-container">
      <h2 className="send-title">
        {i18n?.send?.title || 'Send Tokens'}
      </h2>

      <form onSubmit={handleSubmit} className="send-form">
        {/* Token Selection */}
        <div className="form-group">
          <label htmlFor="selectedToken">
            {i18n?.send?.selectToken || 'Select Token'}
          </label>
          <select
            id="selectedToken"
            name="selectedToken"
            value={formData.selectedToken}
            onChange={handleChange}
            className="form-input"
          >
            <option value="BAP">BAP</option>
            <option value="NFX">NFX</option>
            {tokens?.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>

        {/* Recipient Address */}
        <div className="form-group">
          <label htmlFor="recipientAddress">
            {i18n?.send?.recipientAddress || 'Recipient Address'}
          </label>
          <input
            type="text"
            id="recipientAddress"
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            placeholder={i18n?.send?.recipientPlaceholder || 'Enter recipient address'}
            className={`form-input ${errors.recipientAddress ? 'error' : ''}`}
          />
          {errors.recipientAddress && (
            <span className="error-message">{errors.recipientAddress}</span>
          )}
        </div>

        {/* Amount */}
        <div className="form-group">
          <div className="amount-header">
            <label htmlFor="amount">
              {i18n?.send?.amount || 'Amount'}
            </label>
            <span className="available-balance">
              {i18n?.send?.available || 'Available'}: {availableBalance} {formData.selectedToken}
            </span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder={i18n?.send?.amountPlaceholder || '0.00'}
            step="0.000001"
            min="0"
            className={`form-input ${errors.amount ? 'error' : ''}`}
          />
          {errors.amount && (
            <span className="error-message">{errors.amount}</span>
          )}
        </div>

        {/* Transaction Summary */}
        <div className="transaction-summary">
          <div className="summary-row">
            <span>{i18n?.send?.amount || 'Amount'}</span>
            <span>{formData.amount || '0'} {formData.selectedToken}</span>
          </div>
          <div className="summary-row">
            <span>{i18n?.send?.estimatedFee || 'Estimated Fee'}</span>
            <span>{estimatedFee} {formData.selectedToken}</span>
          </div>
          <div className="summary-row total">
            <span>{i18n?.send?.total || 'Total'}</span>
            <span>{total.toFixed(6)} {formData.selectedToken}</span>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="submit-error">{errors.submit}</div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="send-button"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (i18n?.send?.sending || 'Sending...') 
            : (i18n?.send?.sendButton || 'Send')
          }
        </button>
      </form>
    </div>
  );
};

export default Send;
