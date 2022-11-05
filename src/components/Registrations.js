import { useContractRead } from '@web3modal/react';
import { useAccount } from '@web3modal/react';
import { useEffect } from 'react';
import React from 'react';

import { CERTDAO_ABI, CERTDAO_ADDRESS } from '../constants';

export default function RegistrationTable() {
  const { allRegistrations, setRegistrations } = React.useState(null);
  const { account } = useAccount();

  const config = {
    address: CERTDAO_ADDRESS,
    abi: CERTDAO_ABI,
    args: [account.address],
    functionName: "getContractAddress",
    // Have to set enabled to false otherwise undefined return will create infinite loop in useEffect of useContractRead.
    enabled: false,
  };

  const { data, error, isLoading, refetch } = useContractRead(config);

  // useEffect(() => {
  //   console.log("certdao address: ", CERTDAO_ADDRESS);
  //   async function getAllRegistrations() {
  //     console.log("connected address: ", account.address);
  //     console.log("fetching");
  //     await refetch();
  //     console.log("response", data);
  //     console.log("error", error);
  //     // setRegistrations(data);
  //   }
  //   getAllRegistrations();
  // }, []);

  // return (
  //   <section>
  //     {/* {account.address}'s Registrations: */}
  //     <table className="table w-full">
  //       <thead>
  //         <tr>
  //           <th>Host Name</th>
  //           <th>Status</th>
  //           <th>Block time registered</th>
  //           <th>Description</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <th>1</th>
  //           <td>Cy Ganderton</td>
  //           <td>Quality Control Specialist</td>
  //           <td>Blue</td>
  //         </tr>
  //       </tbody>
  //       <button onClick={async () => refetch()}>Refetch data</button>
  //     </table>
  //   </section>
  // );

  return (
    <section>
      <h1>useContractRead</h1>
      <ul>
        <li>
          Returned data:{" "}
          <span>{isLoading ? "Loading..." : JSON.stringify(data)}</span>
        </li>
        <li>
          Error: <span>{error ? error.message : "No Error"}</span>
        </li>
      </ul>
      <button onClick={async () => refetch()}>Refetch data</button>
    </section>
  );
}
