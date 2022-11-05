import { useContractWrite, useWaitForTransaction } from '@web3modal/react';

import { CERTDAO_ABI, CERTDAO_ADDRESS, PAY_AMOUNT_WEI } from '../constants';

const PAYMENT_OBJECT = { value: PAY_AMOUNT_WEI };

export function UseContractWrite({ input }) {
  const { description, contractAddress, domainName } = input;

  const config = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
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
