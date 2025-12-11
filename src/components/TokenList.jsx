import React, { useState, useEffect } from 'react';
import '../styles/TokenList.css';

/**
 * TokenList Component
 * Displays a list of tokens with their balances and values
 */
const TokenList = ({ tokens, onTokenSelect, i18n }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    if (!tokens) return;
    
    // Filter tokens based on search query
    const filtered = tokens.filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredTokens(filtered);
  }, [tokens, searchQuery]);

  // Format large numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  // Handle token click
  const handleTokenClick = (token) => {
    onTokenSelect?.(token);
  };

  // Calculate total portfolio value
  const totalValue = tokens?.reduce((sum, token) => 
    sum + (token.balance * (token.price || 0)), 0
  ) || 0;

  return (
    <div className="token-list-container">
      <div className="token-list-header">
        <h2 className="token-list-title">
          {i18n?.wallet?.tokens || 'Tokens'}
        </h2>
        <div className="total-balance">
          <span className="balance-label">
            {i18n?.wallet?.totalBalance || 'Total Balance'}
          </span>
          <span className="balance-value">
            ${formatNumber(totalValue)}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={i18n?.common?.search || 'Search tokens...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Token List */}
      <div className="token-list">
        {filteredTokens.length === 0 ? (
          <div className="no-tokens">
            <p>{i18n?.wallet?.noTokens || 'No tokens found'}</p>
          </div>
        ) : (
          filteredTokens.map((token) => (
            <div 
              key={token.symbol} 
              className="token-item"
              onClick={() => handleTokenClick(token)}
            >
              <div className="token-info">
                <div className="token-icon">
                  {token.icon ? (
                    <img src={token.icon} alt={token.name} />
                  ) : (
                    <div className="token-icon-placeholder">
                      {token.symbol.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="token-details">
                  <span className="token-name">{token.name}</span>
                  <span className="token-symbol">{token.symbol}</span>
                </div>
              </div>
              
              <div className="token-balance">
                <span className="balance-amount">
                  {token.balance.toFixed(4)}
                </span>
                <span className="balance-value">
                  ${(token.balance * (token.price || 0)).toFixed(2)}
                </span>
              </div>

              {token.change24h !== undefined && (
                <div className={`token-change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Default props with example data
TokenList.defaultProps = {
  tokens: [
    {
      name: 'Block And Play',
      symbol: 'BAP',
      balance: 1000.5678,
      price: 0.25,
      change24h: 5.23,
      icon: null
    },
    {
      name: 'NFX Token',
      symbol: 'NFX',
      balance: 500.1234,
      price: 0.15,
      change24h: -2.45,
      icon: null
    }
  ]
};

export default TokenList;
