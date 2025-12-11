/**
 * Content Script for BAP Connect Wallet
 * Injected into web pages to enable dApp interactions
 */

// Inject provider into page context
const injectProvider = () => {
  const script = document.createElement('script');
  script.textContent = `
    // Create BAP provider object
    window.bapWallet = {
      isBAP: true,
      version: '0.1.0',
      
      // Request connection to wallet
      connect: async () => {
        return new Promise((resolve, reject) => {
          window.postMessage({
            type: 'BAP_CONNECT_REQUEST',
            source: 'bap-wallet-page'
          }, '*');
          
          // Listen for response
          const handler = (event) => {
            if (event.data.type === 'BAP_CONNECT_RESPONSE') {
              window.removeEventListener('message', handler);
              if (event.data.success) {
                resolve(event.data.address);
              } else {
                reject(new Error(event.data.error));
              }
            }
          };
          window.addEventListener('message', handler);
        });
      },
      
      // Get current account
      getAccount: async () => {
        return new Promise((resolve) => {
          window.postMessage({
            type: 'BAP_GET_ACCOUNT',
            source: 'bap-wallet-page'
          }, '*');
          
          const handler = (event) => {
            if (event.data.type === 'BAP_ACCOUNT_RESPONSE') {
              window.removeEventListener('message', handler);
              resolve(event.data.address);
            }
          };
          window.addEventListener('message', handler);
        });
      },
      
      // Send transaction
      sendTransaction: async (to, amount, token = 'BAP') => {
        return new Promise((resolve, reject) => {
          window.postMessage({
            type: 'BAP_SEND_TRANSACTION',
            source: 'bap-wallet-page',
            data: { to, amount, token }
          }, '*');
          
          const handler = (event) => {
            if (event.data.type === 'BAP_TRANSACTION_RESPONSE') {
              window.removeEventListener('message', handler);
              if (event.data.success) {
                resolve(event.data.txHash);
              } else {
                reject(new Error(event.data.error));
              }
            }
          };
          window.addEventListener('message', handler);
        });
      },
      
      // Sign message
      signMessage: async (message) => {
        return new Promise((resolve, reject) => {
          window.postMessage({
            type: 'BAP_SIGN_MESSAGE',
            source: 'bap-wallet-page',
            data: { message }
          }, '*');
          
          const handler = (event) => {
            if (event.data.type === 'BAP_SIGN_RESPONSE') {
              window.removeEventListener('message', handler);
              if (event.data.success) {
                resolve(event.data.signature);
              } else {
                reject(new Error(event.data.error));
              }
            }
          };
          window.addEventListener('message', handler);
        });
      }
    };
    
    // Dispatch event to notify page that provider is ready
    window.dispatchEvent(new Event('bapWalletReady'));
  `;
  
  (document.head || document.documentElement).appendChild(script);
  script.remove();
};

// Listen for messages from page
window.addEventListener('message', (event) => {
  // Only accept messages from same origin
  if (event.source !== window) return;
  
  const { type, source, data } = event.data;
  
  // Only process messages from our injected script
  if (source !== 'bap-wallet-page') return;
  
  // Forward to background script
  chrome.runtime.sendMessage({ type, data }, (response) => {
    // Send response back to page
    window.postMessage({
      type: type.replace('REQUEST', 'RESPONSE'),
      ...response
    }, '*');
  });
});

// Inject provider when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectProvider);
} else {
  injectProvider();
}

console.log('BAP Connect Wallet content script loaded');
