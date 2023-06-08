source .env

forge script scripts/deploy.e2e.s.sol:DeployE2E \
    --rpc-url http://127.0.0.1:8545 \
    --broadcast \
    --optimize
