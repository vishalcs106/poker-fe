// import "@babel/polyfill";

// import 'core-js/es6/map';
// import 'core-js/es6/set';

import "raf/polyfill";

import React, { Component } from "react";
import "./App.css";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import {
  metaMaskWallet,
  emailMagicWallet,
  socialMagicWallet,
} from "0xpass/wallets";
import { PassProvider, createClient, connectorsForWallets } from "0xpass";
import { ConnectButton } from "0xpass";
import "0xpass/styles.css";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const apiKey = "cf3070fe-be5c-42ee-b988-c227dbe881fe";
const projectId = "edddc04677a3b0384d869d206bfe9949";
const magicApiKey = "pk_live_D43A4447F8B8D095";

const passClient = createClient({ apiKey, chains });

const connectors = connectorsForWallets([
  {
    groupName: "Email",
    wallets: [emailMagicWallet({ apiKey: magicApiKey, chains })],
  },
  {
    groupName: "Social",
    wallets: [
      socialMagicWallet({ apiKey: magicApiKey, chains, provider: "google" }),
    ],
  },
  {
    groupName: "Others",
    wallets: [metaMaskWallet({ projectId, chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

import Table from "./Table.jsx";
import Temp from "./utils/Temp.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WagmiConfig config={wagmiConfig}>
          <PassProvider client={passClient}>
            <Table />
            <Temp />
          </PassProvider>
        </WagmiConfig>
      </div>
    );
  }
}

export default App;
