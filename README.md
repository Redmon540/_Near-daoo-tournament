# tournament-dApp Smart Contract

A [smart contract] written in [AssemblyScript] for an app initialized with [create-near-app]

Tournament App people can create a tournament and publish contract storage.Anyone can see and participate in these tournaments and vote on them
##
Loom video : https://www.loom.com/share/7f3f846099724e10817397cdc8edfa6a

# Quick Start

1. Before you compile this code, you will need to install [Node.js] ≥ 12
2. To use script install yarn [yarn]
3. Install near CLI to call contract methods [near-cli]
4. Connect to your wallet via near-cli
    ```
    near login 
    ```
5. Use [scripts] to get starting the app quickly

# Contract Methods

To run contracts via near CLI

Install dependencies

```
yarn
```

Build and deploy the contract

```
yarn dev
```

Export contract id

```
export CONTRACT = <dev-contract-id>
```

## Call Methods

Too call smart Contract methods and make changes to storage

### Create Tournament

```
 near call $CONTRACT createTournament '{"description":"desc-1","tournamentFee":2,"imageUrl":"photo-url"}' --accountId example.testnet
```

### Update Tournament

```
 near call $CONTRACT updateTournament '{"TournamentID":<Tournament ID>,"description":"desc-2","tournamentFee":2,"imageUrl":"photo-url"}' --accountId example.testnet
```

### Delete Tournament

```
 near call $CONTRACT deleteTournament '{"TournamentID":<Tournament ID>}' --accountId example.testnet
```

### Apply Tournament

```
 near call $CONTRACT applyTournament '{"TournamentID":<Tournament ID>}' --accountId example.testnet deposit <Tournament fee>
```

### Remove Apply

```
 near call $CONTRACT removeApply '{"TournamentID":<Tournament ID>}' --accountId example.testnet
```

### Vote Tournament

```
 near call $CONTRACT voteTournament '{"TournamentID":<Tournament ID>,"isVoteUp":true}' --accountId example.testnet
```

## View Methods

The view methods and doesn't make changes to storage

### get Tournaments

```
 near view $CONTRACT getTournaments '{}' --accountId example.testnet
```

### get Tournament

```
 near view $CONTRACT getTournament '{"TournamentID":<Tournament ID>}' --accountId example.testnet
```

---

# Start Web App

Install dependencies

```
yarn
```
Build contract and web

```
yarn prestart
```

Start the project

```
yarn start
```

[smart contract]: https://docs.near.org/docs/develop/contracts/overview
[assemblyscript]: https://www.assemblyscript.org/
[create-near-app]: https://github.com/near/create-near-app
[node.js]: https://nodejs.org/en/download/package-manager/
[yarn]: https://classic.yarnpkg.com/en/
[near-cli]: https://docs.near.org/docs/tools/near-cli
[scripts]: ./contract/scripts
