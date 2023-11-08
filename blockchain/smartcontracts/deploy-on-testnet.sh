source .env

forge script scripts/v2/testnet/deploy.s.sol:Testnet \
    --private-key $MUMBAI_PRIVATE_KEY \
    --rpc-url $MUMBAI_RPC_URL \
    --broadcast \
    --verbosity
