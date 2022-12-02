import { providers } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { useAccount } from '@web3modal/react';
import React from 'react';

import RegistrationTable from './components/Registrations';
import Form from './components/SubmitVerificationForm';
import Web3 from './components/Web3';
import { WEB3_MODAL_ID } from './constants';


// TODO: Get lock icon: https://icons8.com/icons/set/lock (black, minimal)
// Web3 config
// Change provider to own
const config = {
  projectId: WEB3_MODAL_ID,
  theme: "light",
  accentColor: "blue",
  ethereum: {
    appName: "certDAO-frontend",
    chains: [
      {
        id: 1337,
        name: "Hardhat 1337",
        network: "localhost",
        blockExplorerUrls: [],
        rpcUrls: { default: "http://127.0.0.1:8545" },
      },
    ],
    providers: [
      providers.jsonRpcProvider({
        rpc: (chain) => ({ http: "http://127.0.0.1:8545" }),
      }),
    ],
  },
};

function App() {
  const { account, isConnected, isReady } = useAccount();
  const [registration, clickedOnRegistration] = React.useState(false);

  async function handleRegistrationClick(e) {
    e.preventDefault();
    console.log(isConnected, isReady);
    console.log("clicked handle registration");
    clickedOnRegistration(true);
  }

  async function handleHomeClick(e) {
    e.preventDefault();
    console.log("clicked home registration");
    clickedOnRegistration(false);
  }

  return (
    <>
      <Web3Modal config={config} />
      <div className="container mx-auto">
        <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
          <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
            <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
              <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                <li className="py-2 hover:bg-indigo-300 rounded">
                  <a className="truncate" href="#" onClick={handleHomeClick}>
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                      className="w-7 sm:mx-2 mx-4 inline"
                    />
                    <span className="hidden sm:inline">Home</span>
                  </a>
                </li>
                <li className="py-2 hover:bg-indigo-300 rounded">
                  <a
                    className="truncate"
                    href="#"
                    onClick={handleRegistrationClick}
                  >
                    <img
                      src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg"
                      className="w-7 sm:mx-2 mx-4 inline"
                    />{" "}
                    <span className="hidden sm:inline">Registrations</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl border my-3 w-full">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block text-indigo-600 overflow-ellipsis">
                    CertDAO
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <main
            role="main"
            className="w-full h-full flex-grow p-3 overflow-auto"
          >
            <div className="flex justify-between flex-wrap">
              <h1
                className="justify-self-start text-3xl md:text-5xl mb-4 font-extrabold"
                id="home"
              >
                CertDAO
              </h1>
              <span className="justify-self-end">
                <Web3 />
              </span>
            </div>
            {registration === true && (isReady || isConnected) ? (
              <RegistrationTable {...account} />
            ) : (
              <>
                <p className="py-2 text-xl">
                  <span className="font-bold">CertDAO</span> is a decentralized
                  organization that verifies domain to contract address mappings
                  for the Ethereum community. Think of CertDAO as like the
                  "HTTPS" of Web3.
                  <br />
                  <br />
                  Contract owners use <span className="font-bold">
                    CertDAO
                  </span>{" "}
                  to verify the contract addresses and the domains their users
                  will interact with the contract addresses on.
                  <br />
                  <br />
                  Then, anyone, contract, code, wallet or interface can leverage
                  the
                  <span className="font-bold"> CertDAO</span> registry to verify
                  that the contract address is the authorized one for the
                  domain.
                  <br />
                  <br />
                  The hope is that one day, all primary interfaces for smart
                  contracts (wallets) will use
                  <span className="font-bold"> CertDAO</span>. Scaling the next
                  millions of users' trust in the Ethereum space. For more
                  details on how <span className="font-bold">CertDAO</span>{" "}
                  works, check out this
                  <a className="link link-secondary" href="#">
                    {" "}
                    link.
                  </a>
                  <br />
                  <br />
                  To begin the verification process as a contract owner, connect
                  the wallet that owns the contract address you want to verify.
                  Then enter the domain that users will interact with the
                  contract with and the contract address itself.
                </p>
                <Form />
              </>
            )}
          </main>
        </div>
        <footer className="bg-indigo-800 mt-auto">
          <div className="px-4 py-3 text-white mx-auto">
            <div className="flex">
              <div className="flex-grow flex flex-col"></div>
              <div className="flex-grow flex flex-col">
                <a
                  href="https://discourse.certdao.net/"
                  className="text-xs uppercase tracking-wider"
                >
                  Discourse
                </a>
                <a href="#" className="text-xs uppercase tracking-wider">
                  Discord
                </a>
                <a href="#" className="text-xs uppercase tracking-wider">
                  Twitter
                </a>
              </div>
            </div>
            <div className="text-right text-xs py-2">
              <a href="">&copy;2022 CertDAO</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
