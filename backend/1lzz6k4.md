> eu preciso de ajuda para montar a arquitetura da minha aplicação. minha aplicaçnao é um servidor GraphQL e RESTAPI. ele tem rotas de login em RESTAPI - /login/nonce : pega o nonce necessario para fazer o login - /login/signin : envia assinatura do login e recebe um token - /login/signout/{address} : passa o address e o token para encerrar a sessão ele tambem tem rotas de Query e Mutations do Graphql Query - all_buy_prices - all_sell_prices - all_investors - all_contracts - contract_by_address - contracts_by_investor - all_orders - order_by_hash - order_by_investor Mutation - new_contract Também tenho o modelo dos dados que são: - Contract - Investor - Order - Price Essa aplicação tem um middleware tbm e uma conexão com o banco de dados que é o Firebase RealTime database. Quero que vc sugira uma estrutura de diretórios para organizar meu codigo baseado em clean arquitetura. Minha estrutura atual é essa: chain_vission │ ├── \_\_init\_\_.py │ ├── adapter │ │ ├── \_\_init\_\_.py │ │ └── firebase.py │ ├── graphql │ │ ├── \_\_init\_\_.py │ │ ├── domain │ │ │ ├── \_\_init\_\_.py │ │ │ ├── contract.py │ │ │ ├── investor.py │ │ │ ├── order.py │ │ │ └── price.py │ │ ├── pagination.py │ │ └── schema.py │ ├── login │ │ ├── \_\_init\_\_.py │ │ └── router │ │ ├── \_\_init\_\_.py │ │ ├── nonce.py │ │ ├── signin.py │ │ └── signout.py │ ├── main.py │ └── middleware │ ├── \_\_init\_\_.py │ └── authentication.py ├── poetry.lock ├── pyproject.toml ├── scripts │ └── poetry.py └── tests ├── behave │ └── features │ └── environment.py ├── configtest.py └── integration ├── \_\_init\_\_.py ├── contract │ ├── contract_data.py │ └── test_all_contracts.py ├── investor │ ├── investor_data.py │ └── test_all_investors.py ├── orders │ ├── order_data.py │ └── test_all_orders.py ├── prices │ ├── price_data.py │ └── test_all_prices.py └── utils.py

Organizing your codebase using Clean Architecture principles is a good approach to maintain a scalable and maintainable application. Based on your current directory structure, I'll provide some suggestions for organizing your code following Clean Architecture principles. Please note that these suggestions are subjective and can be adapted based on the specific needs and complexity of your application.

1.  **core**: This directory contains the core business logic of your application, which should be independent of any external frameworks or technologies.

markdown

```markdown
chain_vission
├── core
│ ├── **init**.py
│ ├── contracts
│ │ ├── **init**.py
│ │ ├── contract.py
│ │ ├── contract_repository.py
│ │ └── contract_service.py
│ ├── investors
│ │ ├── **init**.py
│ │ ├── investor.py
│ │ ├── investor_repository.py
│ │ └── investor_service.py
│ ├── orders
│ │ ├── **init**.py
│ │ ├── order.py
│ │ ├── order_repository.py
│ │ └── order_service.py
│ ├── prices
│ │ ├── **init**.py
│ │ ├── price.py
│ │ ├── price_repository.py
│ │ └── price_service.py
│ └── authentication
│ ├── **init**.py
│ ├── auth_service.py
│ └── auth_repository.py
```

2.  **adapters**: This directory contains the implementations of external interfaces, such as your Firebase adapter.

markdown

```markdown
chain_vission
├── adapters
│ ├── **init**.py
│ └── firebase.py
```

3.  **interface**: This directory contains the implementation of the GraphQL and REST API, acting as an interface to your core business logic. It should also contain the schema definition for GraphQL.

markdown

```markdown
chain_vission
├── interface
│ ├── **init**.py
│ ├── graphql
│ │ ├── **init**.py
│ │ ├── schema.py
│ │ └── resolvers
│ │ ├── **init**.py
│ │ ├── contract_resolver.py
│ │ ├── investor_resolver.py
│ │ ├── order_resolver.py
│ │ └── price_resolver.py
│ └── restapi
│ ├── **init**.py
│ └── login
│ ├── **init**.py
│ ├── nonce.py
│ ├── signin.py
│ └── signout.py
```

4.  **middleware**: Keep your middleware in a separate directory.

markdown

```markdown
chain_vission
├── middleware
│ ├── **init**.py
│ └── authentication.py
```

5.  **tests**: Organize your tests based on their respective modules.

markdown

```markdown
chain_vission
└── tests
├── behave
│ └── features
│ └── environment.py
└── integration
├── **init**.py
├── contracts
│ ├── contract_data.py
│ └── test_all_contracts.py
├── investors
│ ├── investor_data.py
│ └── test_all_investors.py
├── orders
│ ├── order_data.py
│ └── test_all_orders.py
├── prices
│ ├── price_data.py
│ └── test_all_prices.py
└── utils.py
```

By following this structure, you can clearly separate concerns, making it easier to maintain and test your application. Additionally, you can have clean boundaries between different parts of your application, making it more modular and extensible. Remember that Clean Architecture is a guiding principle, and the actual implementation might vary depending on your specific needs and preferences.
