import { ConnectButton, useConnectModal } from '@web3modal/react';

export default function Button() {
  const { isOpen, open, close } = useConnectModal();

  return (
    <>
      <ConnectButton />
      {/* or */}
      <button onClick={open}></button>
    </>
  );
}
