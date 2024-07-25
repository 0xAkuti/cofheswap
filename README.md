# CoFHEfhe - ridgeAMM

# TLDR:
Division in FHE is expensive so we use a bunch of CSMM invariants, which use subtraction, to approximate a CPMM such as Uniswap.


Fully Homomorphic Encryption (FHE) allows for the obfuscation of a swap through an AMM.

# Problem:

The cost of encrypting variables and swapping requires division for an invariant curve due to its non-linear properties (xy=k is a hyperbola).

# Solution:

Circumvent the use of division in FHE through an approximation with a series of linear equations.

<img width="772" alt="covfefe1" src="https://github.com/user-attachments/assets/3659afba-248e-4284-94ac-2f91edbf96d2">
In this case we create two encrypted tokens: COFHEFHE and USD on x and y axes respectively. As one buys more COFHEFHE we follow the blue line, until a large enough amount is bought that a second blue line is selected. Desmos: https://www.desmos.com/calculator/wi8y6p8s8e

We have implemented just two linear equations, but it can be as granular as one wants. If one implements an infinite amount of linear equations, one would recreate the constant product market maker. 

<img width="1540" alt="covfefe4" src="https://github.com/user-attachments/assets/7ad045ca-4f5a-4c26-b34a-6780f72948d1">

This linear approximation happens to also be a form of concentrated liquidity AMM since the linear equation crosses the reserves axes. 

Due to the rigid and sharp nature of the curve we could call it a ridgeAMM.

-----------------------

# Fhenix Hardhat Example [![Open in Gitpod][gitpod-badge]][gitpod]




[gitpod]: https://gitpod.io/#https://github.com/fhenixprotocol/fhenix-hardhat-example
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod

This repository contains a sample project that you can use as the starting point
for your Fhenix project. It's also a great fit for learning the basics of
Fhenix smart contract development.

This project is intended to be used with the
[Fhenix Hardhat Beginners Tutorial](TODO), but you should be
able to follow it by yourself by reading the README and exploring its
`contracts`, `tests`, `deploy` and `tasks` directories.

It comes with two fhenix-specific hardhat plugins:

- `fhenix-hardhat-plugin`: The main plugin for fhenix development in hardhat. It injects `fhenixjs` into the hardhat runtime environment, which allows you to interact with encrypted data in your tests and tasks.
- `fhenix-hardhat-docker`: A plugin that allows you to run a local Fhenix testnet in a docker container. This is useful for testing your contracts in a sandbox before deploying them on a testnet or on mainnet.

## Quick start

The first things you need to do are cloning this repository and installing its dependencies:

```sh
git clone https://github.com/FhenixProtocol/fhenix-hardhat-example.git
cd fhenix-hardhat-example
pnpm install
```

Next, you need an .env file containing your mnemonics or keys. You can use .env.example that comes with a predefined mnemonic, or use your own

```sh
cp .env.example .env
```

Once the file exists, let's run a LocalFhenix instance:

```sh
pnpm localfhenix:start
```

This will start a LocalFhenix instance in a docker container. If this worked you should see a `Started LocalFhenix successfully` message in your console.

If not, please make sure you have `docker` installed and running on your machine. You can find instructions on how to install docker [here](https://docs.docker.com/get-docker/).

Now that we have a LocalFhenix instance running, we can deploy our contracts to it:

```sh
npx hardhat deploy
```

Note that this template defaults to use the `localfhenix` network, which is injected into the hardhat configuration.

Finally, we can run the tasks with:

```sh
pnpm task:getCount # => 0
pnpm task:addCount
pnpm task:getCount # => 1
pnpm task:addCount --amount 5
pnpm task:getCount # => 6
```

## Troubleshooting

If Localfhenix doesn't start this could indicate an error with docker. Please verify that docker is running correctly using the `docker run hello-world` command, which should run a basic container and verify that everything is plugged in.

For example, if the docker service is installed but not running, it might indicate you need to need to start it manually.

## More Info

To learn more about the Fhenix Hardhat plugin, check out the [Fhenix Hardhat Plugin Repository](https://github.com/FhenixProtocol/fhenix-hardhat-plugin).
