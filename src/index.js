// TODO(psq):
// mainnet/testnet
// generate 12/generate 24/provide 12/provide 24

import crypto from 'crypto'
import randombytes from 'randombytes'
import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib'
import stacks_transactions from '@blockstack/stacks-transactions'
import c32c from 'c32check'
import wif from 'wif'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
 

const { generateMnemonic, mnemonicToSeed } = bip39
const { bip32, networks, ECPair } = bitcoin
const { ChainID, getAddressFromPrivateKey, TransactionVersion } = stacks_transactions

const networkDerivationPath = `m/44'/5757'/0'/0/0`
const derivationPaths = {
  [ChainID.Mainnet]: networkDerivationPath,
  [ChainID.Testnet]: networkDerivationPath,
}

function privateKeyToWIF(private_key_hex, mainnet) {
  return wif.encode(mainnet ? 0x80 : 0xEF, Buffer.from(private_key_hex, 'hex'), true)
}

function ecPairToHexString(secretKey) {
    const ecPointHex = secretKey.privateKey.toString('hex')
    if (secretKey.compressed) {
        return `${ecPointHex}01`
    }
    else {
        return ecPointHex
    }
}

function deriveStxAddressChain(chain) {
  return (rootNode) => {
    const childKey = rootNode.derivePath(derivationPaths[chain])
    if (!childKey.privateKey) {
      throw new Error('Unable to derive private key from `rootNode`, bip32 master keychain')
    }

    // console.log("childKey.privateKey", childKey.privateKey)
    const ecPair = ECPair.fromPrivateKey(childKey.privateKey)
    const privateKey = ecPairToHexString(ecPair)
    const txVersion = (chain === ChainID.Mainnet) ? TransactionVersion.Mainnet : TransactionVersion.Testnet
    return {
      childKey,
      address: getAddressFromPrivateKey(privateKey, txVersion),
      publicKey: ecPair.publicKey,
      privateKey,
      ecPair,
    }
  }
}

function sha256(data) {
  let hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest()
}

function ripemd160(data) {
  let hash = crypto.createHash('ripemd160')
  hash.update(data)
  return hash.digest()
}

function hash160(data) {
  return ripemd160(sha256(data))
}

async function generateKeys(seed_phrase, mainnet) {
  const seedBuffer = await mnemonicToSeed(seed_phrase)
  const masterKeychain = bip32.fromSeed(seedBuffer)
  const keys = deriveStxAddressChain(mainnet ? ChainID.Mainnet : ChainID.Testnet)(masterKeychain)
  return {
    phrase: seed_phrase,
    private: keys.privateKey,
    public: keys.publicKey.toString('hex'),
    stacks: keys.address,
    stacking: `{ hashbytes: 0x${c32c.c32addressDecode(keys.address)[1]}, version: 0x00 }`,
    btc: c32c.c32ToB58(keys.address),
    wif: privateKeyToWIF(keys.privateKey, mainnet),
  }
}

const argv = yargs(hideBin(process.argv))
  .scriptName("stacks-gen")
  .usage('$0 <cmd> [args]')
  .option('phrase', {
    alias: 'p',
    describe: 'Provide the secret phrase to use',
  })
  .option('testnet', {
    alias: 't',
    describe: 'Generate for testnet instead of mainnet',
  })
  .option('words', {
    alias: 'w',
    default: 24,
    describe: 'Use 24 or 12 secret phrase',
  })
  .choices('w', [12, 24])
  .command('sk', 'Generate keys for Stacks 2.0', (yargs) => {
    yargs.positional('sk', {
      type: 'string',
      describe: 'Generate keys for mainnet or testnet'
    })
  }, async function (argv) {
    const mainnet = !argv.testnet
    const entropy = argv.words === 24 ? 256 : 128
    const phrase = argv.phrase || generateMnemonic(entropy, randombytes)
    console.log('generate', phrase, argv.testnet)

    console.log(JSON.stringify(await generateKeys(phrase, mainnet), null, 2))
  })
  .demandCommand(1, 'You need at least one command')
  .requiresArg('w')
  .requiresArg('p')
  .strictCommands(true)
  .strictOptions(true)
  .help()
  .argv
