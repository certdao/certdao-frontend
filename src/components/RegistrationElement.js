import { useContractRead } from '@web3modal/react';
import { useEffect } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';

export default function RegistrationTableElement({ address }) {
  const getAllContractConfig = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [address],
    functionName: "returnAllContractInfo",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    enabled: false,
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
          <tr>
            <th>{data[0]}</th>
            <td>{data[2]}</td>
            <td>{address}</td>
            <td>{data[3].toNumber()}</td>
          </tr>
        </>
      )}
    </>
  );
}
