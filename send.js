import Web3 from 'web3'




const web3 = new Web3(new Web3.providers.HttpProvider('https://endpoints.omniatech.io/v1/arbitrum/one/5e3144b682254bf1ae34412270882ddd'));
const privateKey = '0x...';
const data = '0x...'
const from = "0x..."
const contractAddress = '0x...' // smart contract
const gasPrice = web3.utils.toWei('0.1', 'gwei')
const gasLimit = 550000;
const nonce = 179


async function SignTX() {
  if (privateKey.length < 42 || undefined) {
    console.log('isi private key nya dulu')
  } else if (from.length < 42 || undefined) {
    console.log('isi address korban')
  } else if (contractAddress.length < 42 || undefined) {
    console.log('isi smart contractnya')
  }
  const rawTransaction = {
    from,
    to: contractAddress,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    nonce,
    data
  };
  const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
  if (signedTransaction.rawTransaction) {
    SendTX(signedTransaction.rawTransaction)
  }

}

async function SendTX(raw) {
  while (true) {
    try {
      console.log('starting bot..')
      const transaction = await web3.eth.sendSignedTransaction(raw);
      if (transaction.status) {
        console.log('succes')
        console.log('Tx Hash:', transaction.transactionHash)
        continue
      }

    } catch (error) {
      console.log(error.message)
      console.log(`Restart bot.. \n`)
      continue
    }
  }
}
SignTX();
