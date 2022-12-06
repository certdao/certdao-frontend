import { BigNumber, utils } from 'ethers';

import certDaoABI from './data/certdao.json';

export const CERTDAO_ADDRESS = process.env.REACT_APP_CERTDAO_ADDRESS;
export const PAY_AMOUNT_ETH = process.env.REACT_APP_PAY_AMOUNT_ETH;
export const PAY_AMOUNT_WEI = BigNumber.from(utils.parseEther(PAY_AMOUNT_ETH));
export const CERTDAO_ABI = certDaoABI.abi;
export const CONTRACT_CHECKER_URL = process.env.REACT_APP_CONTRACT_CHECKER_URL;
export const WEB3_MODAL_ID = process.env.REACT_APP_WEB3_MODAL_ID;
export const DISCOURSE_URL = process.env.REACT_APP_DISCOURSE_URL;
export const GOERLI_INFURA_API_KEY =
  process.env.REACT_APP_GOERLI_INFURA_API_KEY;
