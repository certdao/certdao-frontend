import { AccountButton, ConnectButton, useAccount } from '@web3modal/react';

export default function Web3() {
  const { account } = useAccount();
  return (
    <>
      {account && account.isConnected ? <AccountButton /> : <ConnectButton />}
    </>
  );
}
