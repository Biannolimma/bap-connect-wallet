/**
 * Background Service Worker for BAP Connect Wallet
 * Handles extension background tasks
 */

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('BAP Connect Wallet installed:', details.reason);
  
  if (details.reason === 'install') {
    // First time installation
    chrome.storage.local.set({
      initialized: true,
      installDate: Date.now()
    });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  switch (request.type) {
    case 'GET_WALLET_DATA':
      handleGetWalletData(sendResponse);
      return true; // Keep channel open for async response

    case 'SEND_TRANSACTION':
      handleSendTransaction(request.data, sendResponse);
      return true;

    case 'GET_TRANSACTION_HISTORY':
      handleGetTransactionHistory(sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown request type' });
  }
});

// Handle wallet data request
async function handleGetWalletData(sendResponse) {
  try {
    const result = await chrome.storage.local.get(['walletAddress', 'balance']);
    sendResponse({ success: true, data: result });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

// Handle transaction sending
async function handleSendTransaction(transactionData, sendResponse) {
  try {
    // This is a placeholder - implement actual transaction logic with BAP network
    console.log('Sending transaction:', transactionData);
    
    // Simulate transaction
    setTimeout(() => {
      sendResponse({ 
        success: true, 
        txHash: '0x' + Math.random().toString(16).substr(2, 64)
      });
    }, 2000);
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

// Handle transaction history request
async function handleGetTransactionHistory(sendResponse) {
  try {
    const result = await chrome.storage.local.get(['transactions']);
    sendResponse({ success: true, data: result.transactions || [] });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}

// Listen for alarms (for periodic tasks)
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('Alarm triggered:', alarm.name);
  
  if (alarm.name === 'sync-balance') {
    syncBalances();
  }
});

// Create periodic alarm for balance sync
chrome.alarms.create('sync-balance', {
  periodInMinutes: 5
});

// Sync balances with network
async function syncBalances() {
  try {
    // This is a placeholder - implement actual balance sync with BAP network
    console.log('Syncing balances...');
  } catch (error) {
    console.error('Error syncing balances:', error);
  }
}

console.log('BAP Connect Wallet background service worker loaded');
