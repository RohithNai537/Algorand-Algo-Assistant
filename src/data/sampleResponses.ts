import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/components/MessageItem';

// Function to generate a response based on user input
export const generateResponse = (userMessage: string): Message => {
  // Convert message to lowercase for easier matching
  const message = userMessage.toLowerCase();
  
  // Check for image generation requests
  if ((message.includes("visualize") || message.includes("diagram") || message.includes("image") || message.includes("picture") || message.includes("graph")) && 
      (message.includes("algorithm") || message.includes("blockchain") || message.includes("flow") || message.includes("architecture") || message.includes("structure"))) {
    return {
      id: uuidv4(),
      content: "I've generated a visualization based on your request:",
      sender: "bot",
      timestamp: new Date(),
      images: [
        message.includes("architecture") || message.includes("structure") ? 
          "https://algorand.com/static/open-graph-image-0fbd3b1dc7d2ab2cfb39d17a228f0abf.png" :
          "https://algorand.foundation/static/algorand-og-image-98d8d4b000befd40d5635baffbb65f4e.jpg"
      ]
    };
  }
  
  // Check for Algorand blockchain visualization
  if (message.includes("algorand") && (message.includes("blockchain") || message.includes("network") || message.includes("diagram"))) {
    return {
      id: uuidv4(),
      content: "Here's a visualization of the Algorand blockchain architecture:",
      sender: "bot",
      timestamp: new Date(),
      images: [
        "https://www.algorand.com/static/algorand-transparency-report-da36135591186f54dcf307aa5d5daaf1.jpg"
      ]
    };
  }
  
  // Check for smart contract visualization
  if (message.includes("smart contract") && (message.includes("diagram") || message.includes("visualize") || message.includes("flow"))) {
    return {
      id: uuidv4(),
      content: "Here's a conceptual visualization of Algorand smart contract flow:",
      sender: "bot",
      timestamp: new Date(),
      images: [
        "https://developer.algorand.org/static/e9a4accc98b3638fb6dd9a7c1bad3f8c/12b20/app-call-tx-flow.webp"
      ]
    };
  }
  
  // Check for consensus visualization
  if (message.includes("consensus") && (message.includes("diagram") || message.includes("visualize") || message.includes("flow"))) {
    return {
      id: uuidv4(),
      content: "Here's a visualization of Algorand's Pure Proof-of-Stake consensus mechanism:",
      sender: "bot",
      timestamp: new Date(),
      images: [
        "https://www.algorand.com/static/consensus-security-84032a72c1179472c5c8cbdd31866fa2.jpg"
      ]
    };
  }
  
  // Check for Algorand logo
  if (message.includes("algorand") && (message.includes("logo") || message.includes("brand"))) {
    return {
      id: uuidv4(),
      content: "Here's the Algorand logo:",
      sender: "bot",
      timestamp: new Date(),
      images: [
        "https://cryptologos.cc/logos/algorand-algo-logo.png"
      ]
    };
  }

  // Check for common Algorand development questions
  if (message.includes("teal") && (message.includes("smart contract") || message.includes("example"))) {
    return {
      id: uuidv4(),
      content: "Here's a basic example of a TEAL smart contract for Algorand that performs simple approval logic:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "teal",
        code: `#pragma version 6
// Check if this is an application call
txn TypeEnum
int appl
==
// Make sure it's either a create or call
txn OnCompletion
int NoOp
==
txn OnCompletion
int OptIn
==
||
&&
// If the above is true, approve
bz reject
int 1
return
reject:
int 0
return`
      }]
    };
  }
  
  if (message.includes("pyteal") || (message.includes("python") && message.includes("smart contract"))) {
    return {
      id: uuidv4(),
      content: "Here's how you can write a smart contract using PyTeal:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "python",
        code: `from pyteal import *

def approval_program():
    # Conditions for a valid transaction
    valid_condition = And(
        Txn.type_enum() == TxnType.ApplicationCall,
        Or(
            Txn.on_completion() == OnComplete.NoOp,
            Txn.on_completion() == OnComplete.OptIn
        )
    )
    
    # Return 1 (approve) if valid, otherwise 0 (reject)
    return If(valid_condition, Int(1), Int(0))

def clear_state_program():
    return Int(1)  # Always approve clear state

# Compile the programs
if __name__ == "__main__":
    with open("approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), Mode.Application)
        f.write(compiled)
        
    with open("clear.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), Mode.Application)
        f.write(compiled)`
      }]
    };
  }
  
  if (message.includes("deploy") && message.includes("contract")) {
    return {
      id: uuidv4(),
      content: "To deploy a smart contract on Algorand, you'll need to follow these steps:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "javascript",
        code: `// Example using algosdk in JavaScript
const algosdk = require('algosdk');

async function deployApp() {
  // Connect to an Algorand node
  const algodClient = new algosdk.Algodv2(token, server, port);
  
  // Get account information
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  
  // Define approval and clear programs (compiled TEAL)
  const approvalProgram = new Uint8Array(Buffer.from("compiled approval program", "base64"));
  const clearProgram = new Uint8Array(Buffer.from("compiled clear program", "base64"));
  
  // Create application transaction
  const txParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeApplicationCreateTxn(
    account.addr,
    txParams,
    algosdk.OnApplicationComplete.NoOpOC,
    approvalProgram,
    clearProgram,
    0, // local ints
    0, // local bytes
    1, // global ints
    1, // global bytes
    []  // app args
  );
  
  // Sign and submit
  const signedTxn = txn.signTxn(account.sk);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 5);
  
  // Get the application ID
  const transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
  const appId = transactionResponse['application-index'];
  console.log("Created application with ID:", appId);
}`
      }]
    };
  }
  
  if (message.includes("arc") || message.includes("algorand request for comment")) {
    return {
      id: uuidv4(),
      content: "Algorand Request for Comments (ARCs) are the standards for the Algorand ecosystem. Some important ARCs include:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "markdown",
        code: `# Important Algorand ARCs

- **ARC-0001**: Defines the ARC process itself
- **ARC-0003**: Algorand Standard Asset Parameters Conventions
- **ARC-0004**: Algorand Application Binary Interface (ABI)
- **ARC-0008**: Standard Asset URL
- **ARC-0019**: Assets in Smart Contracts
- **ARC-0020**: Smart Signature Conventions
- **ARC-0072**: Algorand NFT Metadata Standard

For the latest updates, check the official repository at:
https://github.com/algorandfoundation/ARCs`
      }]
    };
  }
  
  if (message.includes("debug") || message.includes("error")) {
    return {
      id: uuidv4(),
      content: "When debugging Algorand smart contracts, these are common issues and solutions:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "markdown",
        code: `# Common Debugging Issues in Algorand Smart Contracts

1. **Cost Exceeded Error**: TEAL programs have an opcode cost limit
   - Solution: Optimize your code or split functionality across multiple apps

2. **Program Logic Error**: Logic in approval/clear programs is incorrect
   - Solution: Use the TEAL debugger in goal or the Algorand IDE plugin

3. **Invalid Transaction Structure**: Missing required fields
   - Solution: Ensure all required fields are present in your txn

4. **Storage Errors**: Issues with local/global storage
   - Solution: Verify storage limits and state access

5. **Asset/Application Not Opted In**: Attempting operations without opt-in
   - Solution: Check opt-in status before operations

For detailed debugging, use:
\`goal clerk dryrun -t your-transaction.txn\`

For IDE integration:
\`algokitd dryrun --txn your-transaction.txn --verbose\``
      }]
    };
  }
  
  if (message.includes("nft") || message.includes("non-fungible token")) {
    return {
      id: uuidv4(),
      content: "Creating NFTs on Algorand is straightforward using Algorand Standard Assets (ASAs). Here's how to create an NFT:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "javascript",
        code: `// Example of creating an NFT on Algorand
const algosdk = require('algosdk');

async function createNFT() {
  const algodClient = new algosdk.Algodv2(token, server, port);
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  
  // Get transaction parameters
  const params = await algodClient.getTransactionParams().do();
  
  // NFT metadata following ARC-69 or ARC-3
  const metadata = {
    name: "My Algorand NFT",
    description: "This is my first Algorand NFT",
    image: "ipfs://QmXxxx...",
    properties: {
      artist: "Creator Name",
      creation_date: new Date().toISOString()
    }
  };
  
  // Use ARC-69 by storing a URL in note field
  const metadataStr = JSON.stringify(metadata);
  const metadataNote = new Uint8Array(Buffer.from(metadataStr));
  
  // Asset creation transaction
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    account.addr,
    metadataNote,
    1,                // Total units (1 for NFT)
    0,                // Decimals (0 for NFT)
    false,            // Default frozen
    account.addr,     // Manager address
    account.addr,     // Reserve address
    account.addr,     // Freeze address
    account.addr,     // Clawback address
    "ALGO-NFT",       // Unit name
    "My NFT",         // Asset name
    "https://ipfs.io/ipfs/QmXxx...", // Asset URL (could be IPFS)
    "",               // Asset metadata hash (optional)
    params
  );
  
  // Sign the transaction
  const signedTxn = txn.signTxn(account.sk);
  
  // Submit the transaction
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 5);
  
  // Get the asset ID
  const ptx = await algodClient.pendingTransactionInformation(txId).do();
  const assetID = ptx["asset-index"];
  console.log("Created NFT with Asset ID:", assetID);
  
  return assetID;
}`
      }]
    };
  }
  
  if (message.includes("tokens") || message.includes("asa") || message.includes("standard asset")) {
    return {
      id: uuidv4(),
      content: "Algorand Standard Assets (ASAs) are the native token implementation on Algorand. Here's how to create a fungible token:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "javascript",
        code: `// Example of creating a fungible token on Algorand
const algosdk = require('algosdk');

async function createToken() {
  const algodClient = new algosdk.Algodv2(token, server, port);
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  
  // Get transaction parameters
  const params = await algodClient.getTransactionParams().do();
  
  // Asset creation transaction
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    account.addr,
    undefined,        // Note field
    1000000,          // Total units (e.g., 1 million)
    6,                // Decimals (e.g., 6 decimal places)
    false,            // Default frozen
    account.addr,     // Manager address
    account.addr,     // Reserve address
    account.addr,     // Freeze address
    account.addr,     // Clawback address
    "MYTKN",          // Unit name
    "My Token",       // Asset name
    "https://mytoken.com", // Asset URL
    "",               // Asset metadata hash (optional)
    params
  );
  
  // Sign the transaction
  const signedTxn = txn.signTxn(account.sk);
  
  // Submit the transaction
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 5);
  
  // Get the asset ID
  const ptx = await algodClient.pendingTransactionInformation(txId).do();
  const assetID = ptx["asset-index"];
  console.log("Created token with Asset ID:", assetID);
  
  return assetID;
}`
      }]
    };
  }
  
  if (message.includes("algorand javascript") || message.includes("js sdk") || message.includes("javascript sdk")) {
    return {
      id: uuidv4(),
      content: "Here's how to get started with the Algorand JavaScript SDK:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "javascript",
        code: `// Installing the SDK:
// npm install algosdk

const algosdk = require('algosdk');

// Connect to an Algorand node
async function connectToAlgorand() {
  // For AlgoNode public API (free)
  const token = '';
  const server = 'https://mainnet-api.algonode.cloud';
  const port = '';
  const algodClient = new algosdk.Algodv2(token, server, port);
  
  // Test the connection
  try {
    const status = await algodClient.status().do();
    console.log("Algorand network status:", status);
    return algodClient;
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
}

// Create an account
function createAccount() {
  const account = algosdk.generateAccount();
  const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
  console.log("Address:", account.addr);
  console.log("Mnemonic:", mnemonic);
  return account;
}

// Check account balance
async function checkBalance(algodClient, address) {
  const accountInfo = await algodClient.accountInformation(address).do();
  const balance = accountInfo.amount / 1000000; // Convert microAlgos to Algos
  console.log(\`Account balance: \${balance} ALGO\`);
  return balance;
}

// Send a transaction
async function sendTransaction(algodClient, senderAccount, receiverAddress, amount) {
  // Get transaction parameters
  const params = await algodClient.getTransactionParams().do();
  
  // Create the transaction
  const txn = algosdk.makePaymentTxnWithSuggestedParams(
    senderAccount.addr,
    receiverAddress,
    amount * 1000000, // Convert Algos to microAlgos
    undefined,
    undefined,
    params
  );
  
  // Sign the transaction
  const signedTxn = txn.signTxn(senderAccount.sk);
  
  // Submit the transaction
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 5);
  console.log("Transaction confirmed with ID:", txId);
  return txId;
}`
      }]
    };
  }
  
  if (message.includes("atomic") && message.includes("transaction")) {
    return {
      id: uuidv4(),
      content: "Atomic transactions in Algorand allow you to group multiple transactions together that either all succeed or all fail. Here's an example:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "javascript",
        code: `// Example of atomic transactions in Algorand
const algosdk = require('algosdk');

async function executeAtomicTransactions() {
  const algodClient = new algosdk.Algodv2(token, server, port);
  const account = algosdk.mnemonicToSecretKey(mnemonic);
  
  // Get transaction parameters
  const params = await algodClient.getTransactionParams().do();
  
  // Create first transaction - a payment
  const txn1 = algosdk.makePaymentTxnWithSuggestedParams(
    account.addr,
    receiverAddr,
    100000, // 0.1 Algo
    undefined,
    undefined,
    params
  );
  
  // Create second transaction - an asset transfer
  const txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(
    account.addr,
    receiverAddr,
    undefined,
    undefined,
    1000, // Amount of the asset
    undefined,
    assetId, // The ID of your asset
    params
  );
  
  // Group the transactions
  const txnGroup = [txn1, txn2];
  algosdk.assignGroupID(txnGroup);
  
  // Sign the transactions
  const signedTxn1 = txn1.signTxn(account.sk);
  const signedTxn2 = txn2.signTxn(account.sk);
  const signedTxnGroup = [signedTxn1, signedTxn2];
  
  // Submit the transaction group
  const { txId } = await algodClient.sendRawTransaction(signedTxnGroup).do();
  
  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txId, 5);
  console.log("Atomic transaction confirmed with ID:", txId);
  
  return txId;
}`
      }]
    };
  }
  
  if (message.includes("state proofs") || message.includes("bridge")) {
    return {
      id: uuidv4(),
      content: "Algorand State Proofs provide a cryptographic proof of the state of the blockchain, enabling secure interoperability with other chains:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "markdown",
        code: `# Algorand State Proofs

State Proofs are a groundbreaking feature in Algorand that allows verifying blockchain state without running a consensus node. They enable:

## Key Benefits

1. **Cross-Chain Interoperability** - Allow safe communication between Algorand and other blockchains
2. **Light Client Implementation** - Create light clients for efficient verification
3. **Improved Security** - Cryptographically secure verification of blockchain state 

## Technical Implementation

State Proofs work by:
1. Having a committee of randomly selected accounts sign a message about the block
2. Using a vector commitment scheme to compress thousands of signatures
3. Creating a compact proof (around 100KB) that can verify consensus on a block

## Usage Example

A bridge contract on Ethereum can use Algorand State Proofs to verify a transaction happened on Algorand with cryptographic certainty, without needing to run an Algorand node.

## Key Components

- **Falcon Keys**: Used for the State Proof signature scheme
- **Vector Commitment**: Compresses many signatures into a compact proof
- **Verifier Contract**: Smart contract on other chains that can verify Algorand State Proofs

For more information, see the Algorand documentation on State Proofs.`
      }]
    };
  }
  
  if (message.includes("consensus") || message.includes("pure proof of stake")) {
    return {
      id: uuidv4(),
      content: "Algorand uses a Pure Proof-of-Stake (PPoS) consensus algorithm. Here's how it works:{{CODE_BLOCK}}",
      sender: "bot",
      timestamp: new Date(),
      codeBlocks: [{
        language: "markdown",
        code: `# Algorand Pure Proof-of-Stake (PPoS) Consensus

Algorand's consensus protocol achieves both security and scalability through its unique Pure Proof-of-Stake approach.

## Key Features

1. **Byzantine Agreement Protocol**
   - Achieves consensus without a central authority
   - Tolerant to malicious users (Byzantine nodes)

2. **Validator Selection**
   - Uses cryptographic sortition to randomly select validators
   - Probability of selection proportional to stake (ALGO holdings)
   - Selection is private until validators reveal themselves

3. **Two-Phase Block Production**
   - **Proposal Phase**: Selected proposers suggest blocks
   - **Voting Phase**: Committee votes on proposals to certify blocks

4. **Security Properties**
   - **Byzantine Fault Tolerance**: Can withstand up to 1/3 of malicious nodes
   - **Fork Resistance**: Guarantees that the chain will never fork
   - **Fast Finality**: Transactions finalize in ~4.5 seconds

5. **Participation Requirements**
   - Any account can participate by registering online
   - Minimal hardware requirements (vs. mining-based systems)

## Technical Advantages

- **Low Computation Needs**: No proof-of-work puzzles
- **Energy Efficient**: Significantly lower energy usage than PoW chains
- **High Transaction Throughput**: ~1000+ TPS
- **Low Transaction Fees**: Typically fraction of a cent

For more details, see the Algorand Foundation's documentation on consensus.`
      }]
    };
  }
  
  // Default response for general Algorand questions
  return {
    id: uuidv4(),
    content: "I'm your Algorand development assistant. I can help with many aspects of Algorand development including:\n\n- TEAL and PyTeal smart contract development\n- Application deployment and debugging\n- Algorand Standard Assets (ASAs) including tokens and NFTs\n- Atomic transactions and state manipulation\n- Algorand Request for Comments (ARCs) standards\n- Consensus mechanism and blockchain architecture\n- Visualizations and diagrams of Algorand concepts\n\nHow can I assist with your Algorand development today?",
    sender: "bot",
    timestamp: new Date()
  };
};

// Initial welcome message
export const welcomeMessage: Message = {
  id: uuidv4(),
  content: "Welcome to AlgoAI Assistant! I'm here to help you with Algorand development questions. You can ask me about smart contracts, PyTeal, debugging, ASAs, NFTs, atomic transactions, ARCs, visualizations, or anything related to the Algorand ecosystem.",
  sender: "bot",
  timestamp: new Date()
};

// Sample starter questions
export const sampleQuestions: string[] = [
  "Show me a basic TEAL smart contract",
  "How do I deploy a contract on Algorand?",
  "Visualize Algorand's consensus mechanism",
  "Help me debug my smart contract",
  "Show me how to create an NFT on Algorand",
  "Diagram the smart contract flow",
  "Show me how to use atomic transactions"
];
