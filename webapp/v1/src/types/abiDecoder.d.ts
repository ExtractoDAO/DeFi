declare module "abi-decoder" {
    function addABI(abiArray: any): void
    function decodeMethod(data: any):
        | {
              name: any
              params: never[]
          }
        | undefined

    function decodeLogs(logs: any)
}
