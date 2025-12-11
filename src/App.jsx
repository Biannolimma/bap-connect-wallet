import React, { useState, useEffect } from 'react';
import Receive from './components/Receive';
import Send from './components/Send';
import TokenList from './components/TokenList';
import History from './components/History';
import LanguageSwitcher from './components/LanguageSwitcher';
import { getTranslations, getCurrentLanguage, setCurrentLanguage } from './utils/i18n';
import './styles/App.css';

/**
 * Main App Component
 * Root component that manages the wallet application state
 */
function App() {
  const [currentView, setCurrentView] = useState('wallet'); // wallet, send, receive, history
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [i18n, setI18n] = useState(getTranslations(language));
  const [walletData, setWalletData] = useState({
    address: '0xabcd1234567890abcdef1234567890abcdef1234',
    balance: {
      BAP: 1000.5678,
      NFX: 500.1234
    },
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
    ],
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
  });

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    setI18n(getTranslations(newLanguage));
  };

  // Handle send transaction
  const handleSend = async (formData) => {
    // This is a placeholder - implement actual transaction logic
    console.log('Sending transaction:', formData);
    
    // Simulate transaction
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Transaction sent successfully');
        resolve();
      }, 2000);
    });
  };

  // Handle transaction click
  const handleTransactionClick = (transaction) => {
    console.log('Transaction clicked:', transaction);
    // Could open a modal with transaction details
  };

  // Handle token select
  const handleTokenSelect = (token) => {
    console.log('Token selected:', token);
    // Could show token details or navigate to send
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'send':
        return (
          <Send
            tokens={walletData.tokens}
            balance={walletData.balance}
            onSend={handleSend}
            i18n={i18n}
          />
        );
      case 'receive':
        return (
          <Receive
            walletAddress={walletData.address}
            i18n={i18n}
          />
        );
      case 'history':
        return (
          <History
            transactions={walletData.transactions}
            onTransactionClick={handleTransactionClick}
            i18n={i18n}
          />
        );
      case 'wallet':
      default:
        return (
          <TokenList
            tokens={walletData.tokens}
            onTokenSelect={handleTokenSelect}
            i18n={i18n}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">{i18n?.app?.name || 'BAP Connect Wallet'}</h1>
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            i18n={i18n}
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-navigation">
        <button
          className={`nav-button ${currentView === 'wallet' ? 'active' : ''}`}
          onClick={() => setCurrentView('wallet')}
        >
          💰 {i18n?.wallet?.tokens || 'Wallet'}
        </button>
        <button
          className={`nav-button ${currentView === 'send' ? 'active' : ''}`}
          onClick={() => setCurrentView('send')}
        >
          📤 {i18n?.common?.send || 'Send'}
        </button>
        <button
          className={`nav-button ${currentView === 'receive' ? 'active' : ''}`}
          onClick={() => setCurrentView('receive')}
        >
          📥 {i18n?.common?.receive || 'Receive'}
        </button>
        <button
          className={`nav-button ${currentView === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentView('history')}
        >
          📜 {i18n?.history?.title || 'History'}
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
