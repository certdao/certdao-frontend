import { CONTRACT_CHECKER_URL } from '../constants.js';

// // Simple eth address and domainName verification
// const domainRegex = new RegExp(
//   "^(((?!-))(xn--)?[a-z0-9-_]{0,61}[a-z0-9]{1,1}.)*(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}).[a-z]{2,}$"
// );


const VALIDATE_ROUTE = `${CONTRACT_CHECKER_URL}/validateContract`;

export function validateContractAddress(address) {
  if (!address) {
    return false;
  }
  if (address.length !== 42) {
    return false;
  }
  if (address.slice(0, 2) !== "0x") {
    return false;
  }
  return true;
}

// Simple domain verification
export function validateDomainName(domainName) {
  if (!domainName) {
    return false;
  }

  if (!domainName.startsWith("http://") && !domainName.startsWith("https://")) {
    domainName = "http://" + domainName;
  }

  try {
    return Boolean(new URL(domainName));
  } catch (e) {
    return false;
  }
}

export async function checkContractAddress(
  domainName,
  contractAddress,
  ownerAddress
) {
  const requestOptions = {
    url: domainName,
    contractAddress: contractAddress,
    owner: ownerAddress,
  };

  const response = await fetch(VALIDATE_ROUTE, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestOptions),
  });

  const jsonResponse = await response.json();
  const returnObj = {
    ok: response.ok,
    json: jsonResponse,
  };

  return returnObj;
}
