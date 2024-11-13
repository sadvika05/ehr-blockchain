# EHR Blockchain

![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-brightgreen)

## Overview

`ehr-blockchain` is a decentralized application (dApp) built on the Ethereum blockchain that enables secure, transparent, and efficient management of **Electronic Health Records (EHR)**. This project utilizes Ethereum smart contracts written in **Solidity** to ensure the integrity and privacy of patient data. The system features a **login functionality** to ensure that only authorized users can view or modify sensitive health information.

---

## Features

- **Ethereum-based**: Leverages Ethereum blockchain for decentralized storage and management of health records.
- **Smart Contracts**: Developed in Solidity to ensure security, privacy, and integrity of records.
- **Login Functionality**: Secure login mechanism for authenticated access.
- **Transparency and Security**: Blockchain ensures that records are tamper-proof and accessible only by authorized users.
- **Role-based Access**: Different access levels for patients, doctors, and admins.

---

## Tech Stack

- **Ethereum**: Decentralized platform for executing smart contracts.
- **Solidity**: The programming language used for writing Ethereum smart contracts.
- **Truffle**: Development framework for Ethereum applications.
- **Web3.js**: JavaScript library for interacting with Ethereum blockchain.
- **Metamask**: Browser extension for managing Ethereum wallets.

---

## Installation

### Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (version 12 or higher)
- **npm** (Node package manager)
- **Truffle Framework**: Install globally with `npm install -g truffle`
- **Metamask** extension installed in your browser.

---

### Setting Up the Project

1. **Clone the repository:**

```bash
git clone https://github.com/sadvika05/ehr-blockchain.git
cd ehr-blockchain
```

2. **Install project dependencies:**

```bash
npm install
```

3. **Compile the Solidity contracts:**

```bash
truffle compile
```

4. **Deploy the contracts to a local Ethereum network (or a testnet like Rinkeby):**

```bash
truffle migrate --network development
```

5. **Start the client application (assuming it’s built with React):**

```bash
npm start
```

---

## Configuring Metamask

1. Add a custom network in Metamask to match the network you've deployed your contracts to (e.g., localhost or Rinkeby).
2. Import your wallet into Metamask, which you'll use to interact with the dApp.

---

## Running Tests

Run the following command to verify that both smart contracts and front-end functionality work correctly:

```bash
truffle test
```

---

## Usage

1. Open the front-end application in your browser (usually at [http://localhost:3000](http://localhost:3000)).
2. Connect your **Metamask wallet**.
3. Log in using the credentials associated with your Ethereum wallet.
4. View and manage health records depending on your role:
    - **Patient**: View and update your records.
    - **Doctor**: View and modify patient records.
    - **Admin**: Full control of all records.

---

## Smart Contracts

The smart contracts in this project handle the following:

- **Storing Patient Records**: Health records are stored securely in a decentralized manner.
- **User Identity Verification**: Ensures that only authorized users (e.g., doctors or patients) can access the records.
- **Role-based Permissions**: Different smart contract methods are available based on user roles.

### Key Contract Files

| File                               | Description                                       |
|------------------------------------|---------------------------------------------------|
| `contracts/HealthRecords.sol`      | Solidity smart contract for managing health records. |
| `migrations/1_initial_migration.js`| Truffle migration script for deploying smart contracts. |

---

## Contributing

Feel free to **fork** this repository and submit **pull requests** if you'd like to contribute. Please open an issue for any bugs or improvements.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **Ethereum**: For providing a decentralized platform for dApp development.
- **Solidity**: For enabling the development of secure smart contracts.
- **Truffle**: For streamlining the Ethereum dApp development process.

---
