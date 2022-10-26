import React from 'react';

import Web3 from './components/Web3';

// Get lock icon: https://icons8.com/icons/set/lock (black, minimal)

function App() {
  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
              <li className="py-2 hover:bg-indigo-300 rounded">
                <a className="truncate" href="#">
                  <img
                    src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                    className="w-7 sm:mx-2 mx-4 inline"
                  />
                  <span className="hidden sm:inline">Home</span>
                </a>
              </li>
              <li className="py-2 hover:bg-indigo-300 rounded">
                <a className="truncate" href="#">
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
        <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
          <div className="flex justify-between">
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
          <p className="py-2 text-xl">
            <span className="font-bold">CertDAO</span> is a decentralized
            organization that verifies domain to contract address mappings for
            the Ethereum community. Think of CertDAO as the "HTTPS" of Web3.
            <br />
            <br />
            Contract owners use <span className="font-bold">CertDAO</span> to
            verify the contract addresses and the domains their users will
            interact with the contract addresses on.
            <br />
            <br />
            Then, anyone, contract, code, wallet or interface can leverage the
            <span className="font-bold"> CertDAO</span> registry to verify that
            the contract address is the correct one for the domain.
            <br />
            <br />
            The hope is that one day, all primary interfaces will use
            <span className="font-bold"> CertDAO</span>. Scaling the next
            millions of users' trust in the Ethereum space. For more details on
            how <span className="font-bold">CertDAO</span> works, check out this
            <a href="#"> link.</a>
            <br />
            <br />
            To begin the verification process as a contract owner, connect the
            wallet that owns the contract address you want to verify. Then,
            click the "Register" button.
          </p>
        </main>
      </div>
      <footer className="bg-indigo-800 mt-auto">
        <div className="px-4 py-3 text-white mx-auto">
          <div className="flex">
            <div className="flex-grow flex flex-col"></div>
            <div className="flex-grow flex flex-col">
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
  );
}

export default App;
