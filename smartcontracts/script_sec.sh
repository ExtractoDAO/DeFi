forge build -C ./src/extracto/future/Future.sol \
    --skip test script \
    --build-info --build-info-path ./out/build-info

slither  --checklist  --ignore-compile . > sec.md