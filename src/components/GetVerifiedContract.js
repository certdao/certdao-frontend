import { useContractRead } from '@web3modal/react';
import { useEffect } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';

export function GetVerifiedContract() {
  const domain = window.location.hostname;

  const getAllContractConfig = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [CERTDAO_ADDRESS, domain],
    functionName: "verify",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    // enabled: true,
  };

  const { data, error, isLoading, refetch } =
    useContractRead(getAllContractConfig);

  useEffect(() => {
    async function callReturnAllContractInfo() {
      await refetch();
    }
    callReturnAllContractInfo();
  }, []);

  return (
    <>
      {data === undefined || data === null ? null : (
        <>
          <p>
            {domain} is verified to interact with {CERTDAO_ADDRESS}:{" "}
            {String(data)}
          </p>
          {error}
        </>
      )}
    </>
  );
}
