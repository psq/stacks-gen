# stacks-gen

Generate all the keys needed 

## usage
```
npx stacks-gen sk --testnet
```

or

```
npm i -g stacks-gen
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
`private`: the private key to use as `seed` when running a miner`
`private`: the public key to use as `seed` when running a miner`, not used at the moment, but useful to generat other keys
`stacks`: your Stacks address
`stacking`: the value to use when sending to the `stc-stack` function on the stacking contract
`btc`: the BTC address you need to fund for mining
`wif`: the Wallet Import Format key to use with bitcoind (this is your BTC private key), where you'll get your stacking rewards

### Command
sk (secret keys)

### Options
`--phrase "phrase"`, `-p "phrase"`: provide the secret phrase to use, useful if you already have one
`--testnet`, `-t`: genereate keys suitable for testnet
`--words 12|24`, `-w 12|24`: generate a 12 or 24 words secret phrase

