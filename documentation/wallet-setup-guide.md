# Wallet Setup Guide

This guide will help you set up MetaMask as your wallet to interact with the blockchain and the Token42 smart contract.

---

## **Step 1: Install MetaMask**

1. **Go to the official MetaMask website**:
   - [https://metamask.io/](https://metamask.io/)

2. **Download the appropriate extension** for your browser:
   - Chrome, Firefox, Brave, or Edge.

3. Install the extension and pin it to your browser toolbar for easy access.

4. Alternatively, you can download the MetaMask mobile app:
   - Available for Android and iOS.

---

## **Step 2: Create a Wallet**

1. Open MetaMask after installation and click on **"Get Started"**.

2. Click on **"Create a Wallet"**.

3. Set a strong password for your wallet. This will be used to unlock MetaMask.

4. **Backup your Secret Recovery Phrase**:
   - Write down the 12-word recovery phrase and store it in a secure location.
   - Never share this phrase with anyone. It is the only way to recover your wallet.

5. Confirm your Secret Recovery Phrase by selecting the words in the correct order.

6. Your wallet is now set up and ready to use.

---

## **Step 3: Connect to a Test Network**

1. Open MetaMask and click on the network dropdown at the top of the MetaMask interface.

2. Select **"Goerli Test Network"** from the list. If it's not visible:
   - Click **"Show/Hide Test Networks"** in the dropdown.
   - Enable "Test Networks" in the settings.

3. Once connected, your wallet will now interact with the Goerli Test Network.

---

## **Step 4: Add Test ETH to Your Wallet**

1. To test transactions, you need some test ETH in your wallet.

2. Visit a Goerli Faucet to request test ETH:
   - [https://goerlifaucet.com/](https://goerlifaucet.com/)
   - Enter your wallet address and request test ETH.

3. Confirm the balance in MetaMask after a few minutes.

---

## **Step 5: Add the Token to MetaMask**

1. After deploying the Token42 contract, copy the **contract address** from Remix or Etherscan.

2. In MetaMask:
   - Go to **"Assets"**.
   - Click on **"Import Tokens"**.

3. Paste the contract address, and MetaMask will automatically populate the token symbol (e.g., TK42) and decimals.

4. Click **"Add Custom Token"** and then **"Import Tokens"**.

5. The Token42 balance should now be visible in MetaMask.

---

## **Step 6: Interact with the Token**

1. You can now interact with the Token42 contract:
   - **Send Tokens**:
     - Go to "Assets", click on "Token42", and choose "Send".
     - Enter the recipient's address and the amount.
   - **Receive Tokens**:
     - Share your wallet address with the sender.

2. You can also interact with the token using Remix or any other DApp connected to MetaMask.

---

## **Troubleshooting**

1. **Cannot See the Goerli Network**:
   - Ensure that test networks are enabled in MetaMask settings.

2. **Test ETH Not Received**:
   - Check the faucet's status or try another faucet.

3. **Token42 Not Showing in Wallet**:
   - Double-check the contract address and ensure it was deployed on the Goerli network.

---

## **Security Tips**

1. Never share your **Secret Recovery Phrase** with anyone.
2. Always confirm the URL of MetaMask and faucets to avoid phishing sites.
3. Use test networks for development and testing to avoid losing real ETH or tokens.

---

This guide covers the basic setup of MetaMask for interacting with the blockchain and the Token42 smart contract. If you have any issues, refer to the official [MetaMask Documentation](https://metamask.io/faqs.html) or contact the project team for support.
