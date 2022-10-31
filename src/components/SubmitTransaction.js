import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import { useSendTransaction } from '@web3modal/react';
import { BigNumber } from 'ethers';

import certDaoABI from '../data/certdao.json';

export function UseContractWrite({ input }) {
  const { description, contractAddress, domainName } = input;
  console.log("submitTransaction", domainName, contractAddress, description);

  const config = {
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: certDaoABI.abi,
    args: [contractAddress, domainName, description],
    functionName: "submitForValidation",
  };

  const transaction = {
    request: {
      to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      value: BigNumber.from("000000000001"),
    },
  };

  const { data, error, isLoading, sendTransaction } =
    useSendTransaction(transaction);
  const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });
  //   const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

  const { data1, error1, isLoading1, write } = useContractWrite({
    config,
    data: transaction?.hash,
  });

  //   const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

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
          Error: <span>{error1 ? error1.message : "No Error"}</span>
        </li>
      </ul>
      <button className="btn btn-primary" onClick={async () => write()}>
        Write to contract
      </button>
    </section>
  );
}
