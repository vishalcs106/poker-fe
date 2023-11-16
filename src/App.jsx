import React, { useState, useEffect } from "react";
import "./App.css";
import SocketProvider from "./provider/SocketProvider";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  metaMaskWallet,
  emailMagicWallet,
  socialMagicWallet,
} from "0xpass/wallets";
import { PassProvider, createClient, connectorsForWallets } from "0xpass";
import "0xpass/styles.css";
import { io } from "socket.io-client";
import Table from "./Table.jsx";
import Temp from "./utils/Temp.jsx";
import GameStateProvider from "./provider/GameStateProvider.js";

const socket = io("http://192.168.0.106:5000", { transports: ["websocket"] });

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

function App() {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    socket.on("gameState", (newGameState) => {
      console.log("socketGameState " + JSON.stringify(newGameState));
      setGameState(newGameState);
    });

    return () => {
      socket.off("gameState");
    };
  }, []);

  return (
    <div className="App">
      <WagmiConfig config={wagmiConfig}>
        <PassProvider client={passClient}>
          <SocketProvider socket={socket}>
            <GameStateProvider gameState={gameState}>
              <Table />
              <Temp />
            </GameStateProvider>
          </SocketProvider>
        </PassProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
