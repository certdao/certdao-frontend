import { useAccount } from '@web3modal/react';
import { useState } from 'react';

import { checkContractAddress, validateContractAddress, validateDomainName } from '../helpers/VerifyAddress';
import { UseContractWrite } from './SubmitTransaction';

export default function Form() {
  const [domainName, setDomainName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [nextStep, setNextStep] = useState(false);
  const [foundOnsite, setFoundOnSite] = useState("");
  const [ownerMatches, setOwnerMatches] = useState("");

  const { account } = useAccount();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");
    try {
      await submitForm(domainName, contractAddress);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleDomainNameChange(e) {
    setDomainName(e.target.value);
  }

  function handleContractAddressChange(e) {
    setContractAddress(e.target.value);
  }

  return (
    <>
      <br />
      <div className="flex flex-row justify-center flex-grow: 1">
        {/* Add connected wallet address */}
        <form className="form-control" onSubmit={handleSubmit}>
          <input
            type="Domain Name"
            placeholder="Domain Name"
            onChange={handleDomainNameChange}
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
              domainName.length === 0 ||
              contractAddress.length === 0 ||
              !account.isConnected ||
              status === "submitting"
            }
          >
            Start Verification
          </button>
          {error !== null && <p className="Error">{error.message}</p>}
        </form>
        {nextStep === true && (
          <div className="flex flex-col flex-auto w-64 pl-8">
            <text>{foundOnsite}</text>
            <text>{ownerMatches}</text>
            <br />
            <text>
              If okay with the above results, and want to continue with DAO
              verification, please click the button below to pay the{" "}
              <b>0.05 ETH</b> fee.
            </text>
            <UseContractWrite
              input={{ domainName, contractAddress, description: "" }}
            />
            {/* <button
              className="btn btn-primary"
              disabled={
                domainName.length === 0 ||
                contractAddress.length === 0 ||
                !account.isConnected ||
                status === "submitting" ||
                nextStep === false
              }
            >
              {/* Submit For DAO Verification */}
            {/* </button> */}
          </div>
        )}
      </div>
    </>
  );

  async function submitForm(domainName, contractAddress) {
    // Pretend it's hitting the network.
    // Validate domain name
    if (!validateDomainName(domainName)) {
      throw new Error("Invalid domain name");
    }
    // Validate contract address
    if (!validateContractAddress(contractAddress)) {
      throw new Error("Invalid contract address");
    }

    try {
      const response = await checkContractAddress(
        domainName,
        contractAddress,
        account.address
      );

      setFoundOnSite(
        `Contract address: ${contractAddress} found on site: ${domainName}: ${response.foundContractAddressOnSite}`
      );

      setOwnerMatches(
        `Contract address: ${contractAddress} owner matches: ${account.address}: ${response.contractCreationAddressMatchesOwner}`
      );

      setNextStep(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
