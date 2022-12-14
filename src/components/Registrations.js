import { useContractRead } from '@web3modal/react';
import { useAccount } from '@web3modal/react';
import { useEffect, useState } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';
import RegistrationTableElement from './RegistrationElement';

export default function RegistrationTable({ address }) {
  const [siteError, setError] = useState(null);

  const getAllContractConfig = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [address],
    functionName: "getContractAddress",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    enabled: false,
  };

  const { data, error, isLoading, refetch } =
    useContractRead(getAllContractConfig);

  useEffect(() => {
    async function callGetAllRegistrations() {
      if (!address) {
        setError("Please connect your wallet to view your registrations.");
        return;
      }
      console.log("account address: ", address);
      console.log(getAllContractConfig);
      await refetch();
    }
    callGetAllRegistrations();
  }, []);

  return (
    <section>
      Connected wallet address: {address}
      <br />
      {error ? <p color="red">Error: {error.message}</p> : null}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Host Name</th>
            <th>Discourse Link</th>
            <th>Status</th>
            <th>Contract Address</th>
            <th>Block time registered</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data === undefined || data === null
            ? null
            : data.map((address) => {
                console.log("address passing to RegistrationTable: ", address);
                return <RegistrationTableElement address={address} />;
              })}
        </tbody>
      </table>
    </section>
  );
}
