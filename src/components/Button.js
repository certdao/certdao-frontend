import { ConnectButton, useConnectModal } from '@web3modal/react';
import { useAccount } from '@web3modal/react';

// Usage

export default function Button() {
  const { isOpen, open, close } = useConnectModal();
  const { account, isReady } = useAccount();

  return (
    <>
      <ConnectButton />
    </>
  );
}
