forge b --skip test script --build-info

forge script scripts/v2/deploy.s.sol:Local \
    --rpc-url http://127.0.0.1:8545 \
    --broadcast \
    --optimize


python3 deploy.py