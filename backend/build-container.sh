# Build Load Balancer
docker build \
    --file docker/Dockerfile.balancer \
    --tag extracto/chainvission:balancer .


# Build ChainVission
docker build \
    --file docker/Dockerfile.api \
    --tag extracto/chainvission:0.3.0 \
    --tag extracto/chainvission:latest .

