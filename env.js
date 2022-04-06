export default {
  // baseUrl: process.env.NODE_ENV === 'production' ? 'https://twy7zbm79a.execute-api.ap-northeast-1.amazonaws.com' : '/send',
  baseUrl: 'https://twy7zbm79a.execute-api.ap-northeast-1.amazonaws.com',
  credential: false,
  localProvider: {
    5: process.env.VUE_APP_HP_R, // rinkeby
    22: process.env.VUE_APP_HP_AR_R,
    66: process.env.VUE_APP_HP_PO_G,
    77: process.env.VUE_APP_HP_OP_K,
    1: process.env.VUE_APP_HP,
    2: process.env.VUE_APP_HP_AR,
    6: process.env.VUE_APP_HP_PO,
    7: process.env.VUE_APP_HP_OP,
  },
  localWSProvider: {
    1: process.env.VUE_APP_WP,
    2: process.env.VUE_APP_WP_AR,
    6: process.env.VUE_APP_WP_PO,
    7: process.env.VUE_APP_WP_OP,
    5: process.env.VUE_APP_WP_R, // rinkeby
    22: process.env.VUE_APP_WP_AR_R,
    66: process.env.VUE_APP_WP_PO_G,
    77: process.env.VUE_APP_WP_OP_K,
  },
  supportLocalNetWorksIDs: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '11',
    '22',
    '33',
    '44',
    '66',
    '77',
    '88',
    '99',
    '511',
  ],
  localChainID_netChainID: {
    1: '1', // mainnet
    2: '42161', // Arbitrum
    3: '1', // zk
    4: '1', // starknet
    5: '4', // rinkeby
    6: '137', // polygon
    7: '10', // optimism
    8: '1', // mainnet
    9: '1', // loopring
    11: '1', // loopring
    22: '421611', // arbitrum test
    33: '4', // zktest
    44: '5', // starknet(R)
    66: '80001', // polygon(R)
    77: '69', // optimism(K)
    88: '3', // ropsten
    99: '5', // loopring(G)
    511: '3', // dydx(R)
  },
  crossAddressContracts: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '0xC7fdb51AeB32AE78d6AE82a614d73580691c5206',
    6: '',
    7: '',
    8: '',
    9: '',
    22: '0x0Da9b4719dfb2803450C5488aabe6dF7779d92Db',
    33: '',
    44: '',
    66: '0x6f9898097f132bb19C59a29B768d24dE017335Be',
    77: '0xDfc52774569D59461C1800f1017Cfb05b61cBE4f',
    88: '',
    99: '',
  },
  txExploreUrl: {
    1: 'https://etherscan.io/tx/', // /tx/  /address/
    5: 'https://rinkeby.etherscan.io/tx/', // /tx/  /address/
    2: 'https://arbiscan.io/tx/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/tx/',
    3: 'https://zkscan.io/explorer/transactions/',
    33: 'https://rinkeby.zkscan.io/explorer/transactions/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://voyager.online/tx/',
    44: 'https://goerli.voyager.online/tx/',
    6: 'https://polygonscan.com/tx/',
    66: 'https://mumbai.polygonscan.com/tx/',
    7: 'https://optimistic.etherscan.io/tx/',
    77: 'https://kovan-optimistic.etherscan.io/tx/',
    8: 'https://immutascan.io/tx/',
    88: '', // ImmutableX don't have testnet browser
    9: 'https://explorer.loopring.io/tx/',
    99: 'https://explorer.loopring.io/tx/',
  },
  accountExploreUrl: {
    1: 'https://etherscan.io/address/', // /tx/  /address/
    5: 'https://rinkeby.etherscan.io/address/', // /tx/  /address/
    2: 'https://arbiscan.io/address/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/address/',
    3: 'https://zkscan.io/explorer/accounts/',
    33: 'https://rinkeby.zkscan.io/explorer/accounts/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://voyager.online/contract/',
    44: 'https://goerli.voyager.online/contract/',
    6: 'https://polygonscan.com/address/',
    66: 'https://mumbai.polygonscan.com/address/',
    7: 'https://optimistic.etherscan.io/address/',
    77: 'https://kovan-optimistic.etherscan.io/address/',
    8: 'https://market.immutable.com/inventory/',
    88: 'https://market.ropsten.immutable.com/inventory/',
    9: 'https://explorer.loopring.io/account/',
    99: 'https://explorer.loopring.io/account/',
  },
}
