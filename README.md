# stacks-gen

Generate all the keys needed for use with Stacks 2.0 Mining and Stacking

## prerequisites
You will need to have node.js and npm installed first.  Head over to the [node.js download](https://nodejs.org/en/download/) page

## usage with npx
If `npx` is not installed, install it first
```
npm install -g npx
```
Then you can use this command

```
npx -q stacks-gen sk --testnet
```
`-q` is not required, but it will avoid displaying compilation warnings.

## usage with npm

Install the package
```
npm i -g stacks-gen
```

Then you can use this command (or other ones, see below for more details on the options)
```
stacks-gen sk --phrase "pass on the milk or the world will end very very soon"
```

### Example
```
npx stacks-gen sk

{
  "phrase": "lottery flip yard shrug dog zero finger seven author proud train oppose smooth pipe spider tobacco problem wet evoke excite illness burst upon champion",
  "private": "78a821b4b309f9b38dfcd62c4f55966c20e0ec83414dad7a142dede3686ec26801",
  "public": "034b4862c186a52ea1dc4e85c74a1e3b22050bb25f9e812bc0f185fb11720e837f",
  "stacks": "SPE2VEBT417GSS66RSGC7Z82DT5AQRGKJQJJ9NH6",
  "stacking": "{ hashbytes: 0x1c2db97a204f0ce4c6c660c3fd026e8aabe21395, version: 0x00 }",
  "btc": "13ZzhNGBDdaCKEW1V9vS2Cf6Y7Ac2eHtdD",
  "wif": "L1GFZXR2UKyH9gP9iQGbweTaW5Ab9rTNe2kzB8RSEa695M684vQj"
}
```

* `private`: the public key to use as `seed` when running a miner`, not used at the moment, but useful to generat other keys
* `stacks`: your Stacks address
* `stacking`: the value to use when sending to the `stc-stack` function on the stacking contract
* `btc`: the BTC address you need to fund for mining
* `wif`: the Wallet Import Format key to use with bitcoind (this is your BTC private key), where you'll get your stacking rewards

### Command
sk (secret keys)

#### Options
* `--help`: displays the help
* `--phrase "phrase"`, `-p "phrase"`: provide the secret phrase to use, useful if you already have one
* `--testnet`, `-t`: genereate keys suitable for testnet
* `--version`: displays the version
* `--words 12|24`, `-w 12|24`: generate a 12 or 24 words secret phrase

## NOTES
As of 9/26/2020, this does not work in the sandbox from the [explorer](https://testnet-explorer.blockstack.org/sandbox), as the Stacks address used is the one derived for an app, not the one directly from the seed phrase.  Once the explorer uses Connect, then this will work.
