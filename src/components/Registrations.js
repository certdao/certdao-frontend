import { useContractRead } from '@web3modal/react';
import { useAccount } from '@web3modal/react';
import { useEffect } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';
import RegistrationTableElement from './RegistrationElement';

export default function RegistrationTable() {
  const { account } = useAccount();

  const getAllContractConfig = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [account.address],
    functionName: "getContractAddress",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    enabled: false,
  };

  const { data, error, isLoading, refetch } =
    useContractRead(getAllContractConfig);

  async function getAllRegistrations() {
    console.log("address: ", account.address);
    console.log("Calling getContractAddress");
    await refetch();
    console.log("data: ", data);
    console.log("error: ", error);
  }

  useEffect(() => {
    async function callGetAllRegistrations() {
      await getAllRegistrations();
    }
    callGetAllRegistrations();
  }, []);

  return (
    <section>
      Account: {account.address}
      <br />
      <text> Contract Addresses: {data} </text>
      <br />
      <text> Error: {error?.message} </text>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Host Name</th>
            <th>Status</th>
            <th>Block time registered</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* {data === undefined ? (
            <></>
          ) : (
            <>
              <RegistrationTableElement input={data} />{" "}
            </>
          )} */}
          {/* {data === undefined || data === null
            ? null
            : data.map((address) => {
                console.log("address: ", address);
                return <RegistrationTableElement input={address} />;
              })} */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
