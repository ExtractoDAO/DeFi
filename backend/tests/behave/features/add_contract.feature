Feature: Contracts
    The front-end wants to signin, save a new contract and query that contract.


    Scenario: User buy contract
        Given that the user is logged in "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        When user buys a contract
        Then the new contract should be available