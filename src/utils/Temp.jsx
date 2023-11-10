import { useAccount } from "wagmi";
const Temp = () => {
  const { address, isError, isLoading } = useAccount();
  console.log("accountData " + JSON.stringify(address));
  return <div></div>;
};
export default Temp;
