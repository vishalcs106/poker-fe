import React from "react";
import { useAccount } from "wagmi";

export function withAccount(Component) {
  return function WrappedComponent(props) {
    const { address, isError, isLoading } = useAccount();
    return <Component {...props} accountData={address} />;
  };
}
