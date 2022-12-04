import { CONTRACT_CHECKER_URL } from '../constants.js';

const CREATE_GOVERNANCE_ROUTE = `${CONTRACT_CHECKER_URL}/createGovernancePoll`;

export async function createGovernancePoll(
  domainName,
  contractAddress,
  ownerAddress,
  transactionHash
) {
  const requestOptions = {
    url: domainName,
    contractAddress: contractAddress,
    owner: ownerAddress,
    transactionHash,
  };

  const response = await fetch(CREATE_GOVERNANCE_ROUTE, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestOptions),
  });

  if (!response.ok) {
    console.log("Error creating governance poll: ", response);
    throw new Error("Error creating governance poll");
  }
}
