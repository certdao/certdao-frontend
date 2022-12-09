import { CONTRACT_CHECKER_URL } from '../constants.js';

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
export function validateUrl(Url) {
  if (!Url) {
    return false;
  }

  if (!Url.startsWith("http://") && !Url.startsWith("https://")) {
    Url = "http://" + Url;
  }

  try {
    return Boolean(new URL(Url));
  } catch (e) {
    return false;
  }
}

export async function checkContractAddress(Url, contractAddress, ownerAddress) {
  const requestOptions = {
    url: Url,
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
