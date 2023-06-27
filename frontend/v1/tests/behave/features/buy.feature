Feature: Buy in Extracto Dao

    @dev
    Scenario: Buy 173 USDT
        Given user is logged in
        When the user enters the route: "/buy"
        And seletc "USDC" Token
        And input "173" of value
        And confirm purchase
        And the user enters the route: "/drawer"
        Then user should have a contrato with "90.58" kg
