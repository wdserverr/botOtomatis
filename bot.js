import Web3 from 'web3'
const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-testnet.public.blastapi.io'));



const privateKey = '0x...PrivateKey';
const data = '0x095ea7b3000000000000000000000000f5a0e7b27f81f7a963e7a981852ca7845cdf32b90000000000000000000000000000000000000000000000000000000000000000' //ganti data ini dan sesuaikan
const from = "0x...Address"
const contractAddress = '0x.. ContractAddress' // smart contract
const gasPrice = web3.utils.toWei('5', 'gwei')
const gasLimit = 100000;



async function sendBalance() {
  if (privateKey.length < 42 || undefined) {
    console.log('isi private key nya dulu')
  } else if (from.length < 42 || undefined) {
    console.log('isi address korban')
  } else if (contractAddress.length < 42 || undefined) {
    console.log('isi smart contractnya')
  } else {

    console.log('BOT BERJALAN!!')
    console.log('############################################################################')
    while (true) {
      const nonce = await web3.eth.getTransactionCount(from);

      const rawTransaction = {
        from,
        to: contractAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        nonce: web3.utils.toHex(nonce),
        data
      };
      const balance = await web3.eth.getBalance(from)
      try {
            if (balance > 100000000000000) {
              const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
              const transaction = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
              if (transaction.status) {
                console.log('succes')
                console.log('Tx Hash:',transaction.transactionHash)
                continue
              }
            }
          } catch (error) {
            console.log('Scanning Saldo..')
            console.log('balance :', web3.utils.fromWei(balance.toString(), 'ether'))
            continue
        }
        }
      }
  }
  
  sendBalance();
