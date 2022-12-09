import { useContractWrite, useWaitForTransaction } from '@web3modal/react';
import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';

import { CERTDAO_ABI, CERTDAO_ADDRESS, PAY_AMOUNT_WEI } from '../constants';
import { createGovernancePoll } from '../helpers/GovernancePollHelpers';

const PAYMENT_OBJECT = { value: PAY_AMOUNT_WEI };

export function SubmitVerificationTransaction({ input }) {
  const { description, contractAddress, Url } = input;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [contractAddress, Url, description, PAYMENT_OBJECT],
    functionName: "submitForValidation",
  };

  const { data, error, isLoading, write } = useContractWrite(config);
  const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    async function callReturnAllContractInfo() {
      if (receipt) {
        console.log("Receipt: ", receipt);
        setIsSubmitting(true);
        await createGovernancePoll(
          Url,
          contractAddress,
          receipt.from,
          receipt.transactionHash
        );
        setIsSubmitting(false);
      }
    }
    callReturnAllContractInfo();
  }, [receipt]);

  return (
    <section>
      <ul>
        <li>
          {(isLoading || isWaiting || isSubmitting) && (
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
        <li>
          {error ? <p color="red">Error response: {error.message}</p> : null}
        </li>
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
