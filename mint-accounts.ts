import * as Web3 from "@solana/web3.js"
import env from "dotenv"
import base58 from "bs58";
import * as token from "@solana/spl-token"

env.config();

const main = async () => {


   const url = Web3.clusterApiUrl('devnet')
   const connection = new Web3.Connection(url);

   const decoded = base58.decode(process.env.PRIVATE_KEY!);
   const keyPair = Web3.Keypair.fromSecretKey(decoded)

   const mintedToken = new Web3.PublicKey('<mint-public-key>')
   const tokenAccount = new Web3.PublicKey('token-account-public-key')

   const mintedTokens = await token.mintTo(
       connection,
       keyPair,
       mintedToken,
       tokenAccount,
       keyPair.publicKey,
       Web3.LAMPORTS_PER_SOL * 1000000000
   )

   console.log("minted tokens", mintedTokens)

}

main();