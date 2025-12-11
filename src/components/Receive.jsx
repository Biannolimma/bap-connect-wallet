import React, { useState } from 'react';
import '../styles/Receive.css';

/**
 * Receive Component
 * Displays the user's wallet address and QR code for receiving tokens
 */
const Receive = ({ walletAddress, i18n }) => {
  const [copied, setCopied] = useState(false);

  // Handle copy address to clipboard
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  // Format address for display (show first 6 and last 4 characters)
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="receive-container">
      <h2 className="receive-title">
        {i18n?.receive?.title || 'Receive Tokens'}
      </h2>

      <div className="qr-code-section">
        <div className="qr-code-placeholder">
          {/* QR Code will be generated here using a library like qrcode.react */}
          <div className="qr-placeholder-text">QR Code</div>
        </div>
        <p className="qr-instruction">
          {i18n?.receive?.scanQRCode || 'Scan QR Code'}
        </p>
      </div>

      <div className="address-section">
        <label className="address-label">
          {i18n?.receive?.yourAddress || 'Your Address'}
        </label>
        <div className="address-display">
          <span className="address-full" title={walletAddress}>
            {walletAddress || 'BAP1234...5678'}
          </span>
          <span className="address-short">
            {formatAddress(walletAddress || 'BAP1234567890ABCDEF1234567890ABCDEF5678')}
          </span>
        </div>

        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopyAddress}
        >
          {copied 
            ? (i18n?.common?.copied || 'Copied!') 
            : (i18n?.wallet?.copyAddress || 'Copy Address')
          }
        </button>
      </div>

      <div className="warning-section">
        <p className="warning-text">
          ⚠️ {i18n?.receive?.warning || 'Only send BAP/NFX tokens to this address'}
        </p>
      </div>

      <p className="share-instruction">
        {i18n?.receive?.shareAddress || 'Share this address to receive tokens'}
      </p>
    </div>
  );
};

export default Receive;
