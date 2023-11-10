import React from "react";
import axios from "axios";
import { useUser } from "0xpass";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const JoinTable = () => {
  const { address, isConnected } = useAccount();
  const { user, getAccessToken } = useUser();
  console.log(getAccessToken);
  console.log(address);
  const handleJoin = async () => {
    try {
      const playerData = {
        user: {},
        chips: 1000,
      };
      const response = await axios.post("/jointable", playerData);
      console.log("Player joined:", response.data);
    } catch (error) {
      console.error(
        "Error joining table:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      {user && <p> User's Twitter Username: {user.id} </p>}
      <button onClick={handleJoin}>Join Table</button>
    </div>
  );
};

export default JoinTable;
