import { useAccount } from '@web3modal/react';
import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';

import { checkContractAddress, validateContractAddress, validateurl } from '../helpers/VerifyAddress';
import { GetVerifiedContract } from './GetVerifiedContract';
import { SubmitVerificationTransaction } from './SubmitVerificationTransaction';

export default function Form() {
  const [url, seturl] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [nextStep, setNextStep] = useState(false);
  const [foundOnsite, setFoundOnSite] = useState(false);
  const [ownerMatches, setOwnerMatches] = useState(false);

  const { account } = useAccount();

  useEffect(() => {}, [foundOnsite, ownerMatches]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");
    try {
      await submitForm(url, contractAddress);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleurlChange(e) {
    seturl(e.target.value);
  }

  function handleContractAddressChange(e) {
    setContractAddress(e.target.value);
  }

  return (
    <>
      <br />
      {status === "submitting" ? (
        <div className="flex flex-row justify-center flex-grow: 1">
          <LoadingIcons.ThreeDots
            type="oval"
            width="50"
            height="50"
            fill="#000000"
          />
        </div>
      ) : nextStep === false ? (
        <>
          <div className="flex flex-row justify-center flex-grow: 1">
            {/* Add connected wallet address */}
            <form className="form-control w-1/2" onSubmit={handleSubmit}>
              <input
                type="URL"
                placeholder="URL"
                onChange={handleurlChange}
                className="input input-bordered input-group-lg"
              />
              <br />
              <input
                type="Contract Address"
                placeholder="Contract Address to Verify"
                onChange={handleContractAddressChange}
                className="input input-bordered input-group-lg"
              />
              <br />
              <button
                className="btn btn-primary"
                disabled={
                  url.length === 0 ||
                  contractAddress.length === 0 ||
                  !account.isConnected ||
                  status === "submitting"
                }
              >
                Start Verification
              </button>
              {error !== null && (
                <p className="Error" color="red">
                  {error.message}
                </p>
              )}
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center flex-grow: 1">
            <p className="py-2 text-l">
              {contractAddress} lives on {url}: {String(foundOnsite)}
            </p>
            <p className="py-2 text-l">
              {account.address} matches contract owner: {String(ownerMatches)}
            </p>
            <p>
              If you are okay with the above results, and want to continue with
              DAO verification, please click the button below to pay the{" "}
              <b>0.05 ETH</b> fee.
            </p>
            <br />
            <GetVerifiedContract />
            <br />
            <SubmitVerificationTransaction
              input={{ url, contractAddress, description: "" }}
            />
          </div>
        </>
      )}
    </>
  );

  async function submitForm(url, contractAddress) {
    // Validate url
    if (!validateurl(url)) {
      throw new Error("Invalid url");
    }
    // Validate contract address
    if (!validateContractAddress(contractAddress)) {
      throw new Error("Invalid contract address");
    }

    try {
      const response = await checkContractAddress(
        url,
        contractAddress,
        account.address
      );

      console.log("Response from verification heuristic check: ", response);
      if (!response.ok) {
        throw new Error(response.json.message);
      }

      const {
        foundContractAddressOnSite,
        contractCreationAddressMatchesOwner,
      } = response.json;

      setContractAddress(contractAddress);
      seturl(url);
      setFoundOnSite(foundContractAddressOnSite);
      setOwnerMatches(contractCreationAddressMatchesOwner);
      setNextStep(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
