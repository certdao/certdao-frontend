import { useContractWrite, useWaitForTransaction } from "@web3modal/react";

import { CERTDAO_ABI, CERTDAO_ADDRESS, PAY_AMOUNT_WEI } from "../constants";
import LoadingIcons from "react-loading-icons";

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
          {(isLoading || isWaiting) && (
            <div className="flex flex-row justify-center flex-grow: 1">
              <LoadingIcons.ThreeDots
                type="oval"
                width="50"
                height="50"
                fill="#000000"
              />
            </div>
          )}
        </li>
        <li>{error ? <p color="red">Error: {error.message}</p> : null}</li>
        <li>
          {receipt ? (
            <p color="blue">
              Success! Checkout the registration tab for details
            </p>
          ) : null}
        </li>
      </ul>
      <button className="btn btn-primary" onClick={async () => write()}>
        Start initial verification
      </button>
    </section>
  );
}
