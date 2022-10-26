import { Web3Modal } from '@web3modal/react';

import Button from './Button';

const config = {
  projectId: "certdao",
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "web3Modal",
  },
};

export default function Web3() {
  return (
    <>
      <Button />
      <Web3Modal config={config} />
    </>
  );
}
