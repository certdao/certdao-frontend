import { useAccount } from "@web3modal/react";
import { useState, useEffect } from "react";
import LoadingIcons from "react-loading-icons";

import {
  checkContractAddress,
  validateContractAddress,
  validateDomainName,
} from "../helpers/VerifyAddress";
import { UseContractWrite } from "./SubmitVerificationTransaction";

export default function Form() {
  const [domainName, setDomainName] = useState("");
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
              {contractAddress} lives on {domainName}: {String(foundOnsite)}
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
            <UseContractWrite
              input={{ domainName, contractAddress, description: "" }}
            />
          </div>
        </>
      )}
    </>
  );

  async function submitForm(domainName, contractAddress) {
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

      setContractAddress(contractAddress);
      setDomainName(domainName);
      setFoundOnSite(response.foundContractAddressOnSite);
      setOwnerMatches(response.contractCreationAddressMatchesOwner);
      setNextStep(true);
    } catch (err) {
      throw new Error(err);
    }
  }
}
