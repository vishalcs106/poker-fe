import React from "react";
import { useAccount } from "wagmi";

export function withAccount(Component) {
  return function WrappedComponent(props) {
    const { data: accountData, isError, isLoading } = useAccount();
    console.log("data " + JSON.stringify(accountData));
    return <Component {...props} accountData={accountData} />;
  };
}
