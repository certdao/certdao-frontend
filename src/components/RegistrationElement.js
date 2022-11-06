import { useContractRead } from '@web3modal/react';
import { useEffect } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';

export default function RegistrationTableElement({ input }) {
  const { address } = input;

  const getAllContractConfig = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [address],
    functionName: "returnAllContractInfo",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    enabled: false,
  };

  const { data, error, refetch } = useContractRead(getAllContractConfig);

  useEffect(() => {
    async function callReturnAllContractInfo() {
      await refetch();
    }
    callReturnAllContractInfo();
  }, [data]);

  return (
    <>
      console.log("dataregistrationElement: ", data);
      console.log("errorregistrationElement: ", error);
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
    </>
  );
}
