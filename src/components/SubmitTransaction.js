import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import { BigNumber, utils } from 'ethers';

import certDaoABI from '../data/certdao.json';

const PAY_AMOUNT = BigNumber.from(utils.parseEther("0.05"));
const PAYMENT_OBJECT = { value: PAY_AMOUNT };
const CERTDAO_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export function UseContractWrite({ input }) {
  const { description, contractAddress, domainName } = input;
  const domainNameHost = URL(domainName).hostname;

  console.log(
    "submitTransaction",
    domainNameHost,
    contractAddress,
    description
  );

  const config = {
    address: CERTDAO_ADDRESS,
    abi: certDaoABI.abi,
    args: [contractAddress, domainName, description, PAYMENT_OBJECT],
    functionName: "submitForValidation",
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

  return (
    <section>
      <ul>
        <li>
          Write Data:{" "}
          <span>{isLoading ? "Loading..." : JSON.stringify(data)}</span>
        </li>
        <li>
          Receipt Data:{" "}
          <span>{isWaiting ? "Waiting..." : JSON.stringify(receipt)}</span>
        </li>
        <li>
          Error: <span>{error ? error.message : "No Error"}</span>
        </li>
      </ul>
      <button className="btn btn-primary" onClick={async () => write()}>
        Write to contract
      </button>
    </section>
  );
}
