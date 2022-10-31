import { AccountButton, ConnectButton, useAccount } from '@web3modal/react';
import { useDisconnect } from '@web3modal/react';

export default function Web3() {
  const { account, isReady } = useAccount();
  const disconnect = useDisconnect();
  return (
    <>
      {account && account.isConnected ? (
        <AccountButton />
      ) : (
        // <h1>
        //   Connected to account: <span>{account.address}</span>
        // </h1>
        <ConnectButton />
      )}
    </>
  );
}
