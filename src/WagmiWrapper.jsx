import React, { useEffect, useState } from "react";
import { useConnect, useAccount } from "wagmi";
import App from "./App";

function WagmiWrapper() {
  const { connect, connectors, isConnected: isConnectAttempted } = useConnect();
  const { data: accountData } = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // If not connected and a connection has been attempted, try to connect with the first available connector
    if (!accountData && isConnectAttempted && connectors.length > 0) {
      connect(connectors[0]);
    }
  }, [connect, connectors, accountData, isConnectAttempted]);

  useEffect(() => {
    setIsConnected(!!accountData);
  }, [accountData]);

  return <App isConnected={isConnected} />;
}

export default WagmiWrapper;
