import React from "react";
import { useAccount } from "wagmi";

export function withAccount(Component) {
  return function WrappedComponent(props) {
    const { address, isError, isLoading } = useAccount();
    console.log("data " + JSON.stringify(address));
    return <Component {...props} accountData={address} />;
  };
}
