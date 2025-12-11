import React, { useState, useEffect } from 'react';
import '../styles/History.css';

/**
 * History Component
 * Displays transaction history with filtering options
 */
const History = ({ transactions, onTransactionClick, i18n }) => {
  const [filter, setFilter] = useState('all'); // all, sent, received
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (!transactions) return;
    
    // Filter transactions based on selected filter
    let filtered = transactions;
    if (filter === 'sent') {
      filtered = transactions.filter(tx => tx.type === 'sent');
    } else if (filter === 'received') {
      filtered = transactions.filter(tx => tx.type === 'received');
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, filter]);

  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return i18n?.common?.now || 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  // Format address (first 6 + last 4 characters)
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  // Handle transaction click
  const handleTransactionClick = (transaction) => {
    onTransactionClick?.(transaction);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">
        {i18n?.history?.title || 'Transaction History'}
      </h2>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {i18n?.history?.filterAll || 'All'}
        </button>
        <button
          className={`filter-tab ${filter === 'sent' ? 'active' : ''}`}
          onClick={() => setFilter('sent')}
        >
          {i18n?.history?.filterSent || 'Sent'}
        </button>
        <button
          className={`filter-tab ${filter === 'received' ? 'active' : ''}`}
          onClick={() => setFilter('received')}
        >
          {i18n?.history?.filterReceived || 'Received'}
        </button>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>{i18n?.history?.noTransactions || 'No transactions found'}</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div 
              key={tx.hash} 
              className="transaction-item"
              onClick={() => handleTransactionClick(tx)}
            >
              <div className="transaction-icon">
                {tx.type === 'sent' ? (
                  <span className="icon-sent">↑</span>
                ) : (
                  <span className="icon-received">↓</span>
                )}
              </div>

              <div className="transaction-details">
                <div className="transaction-main">
                  <span className="transaction-type">
                    {tx.type === 'sent' 
                      ? (i18n?.history?.sent || 'Sent') 
                      : (i18n?.history?.received || 'Received')
                    }
                  </span>
                  <span className={`transaction-amount ${tx.type === 'sent' ? 'negative' : 'positive'}`}>
                    {tx.type === 'sent' ? '-' : '+'}{tx.amount} {tx.token}
                  </span>
                </div>
                
                <div className="transaction-secondary">
                  <span className="transaction-address">
                    {tx.type === 'sent' 
                      ? `${i18n?.history?.to || 'To'}: ${formatAddress(tx.to)}`
                      : `${i18n?.history?.from || 'From'}: ${formatAddress(tx.from)}`
                    }
                  </span>
                  <span className="transaction-date">
                    {formatDate(tx.timestamp)}
                  </span>
                </div>
              </div>

              <div className={`transaction-status ${getStatusClass(tx.status)}`}>
                {tx.status === 'confirmed' && (i18n?.history?.confirmed || 'Confirmed')}
                {tx.status === 'pending' && (i18n?.history?.pending || 'Pending')}
                {tx.status === 'failed' && (i18n?.history?.failed || 'Failed')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Default props with example data
History.defaultProps = {
  transactions: [
    {
      hash: '0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      type: 'sent',
      amount: 100.5,
      token: 'BAP',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
      timestamp: Date.now() - 3600000,
      status: 'confirmed'
    },
    {
      hash: '0xdef4567890abcdef1234567890abcdef1234567890abcdef1234567890abcd12',
      type: 'received',
      amount: 250.0,
      token: 'NFX',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      from: '0x9876543210fedcba9876543210fedcba98765432',
      timestamp: Date.now() - 7200000,
      status: 'confirmed'
    }
  ]
};

export default History;
