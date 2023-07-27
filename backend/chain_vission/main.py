from chain_vission.use_cases.rest.login.router import signout
from chain_vission.use_cases.rest.login.router import signin
from chain_vission.use_cases.rest.login.router import nonce
from chain_vission.use_cases.graphql.schema import schema
from strawberry.fastapi import GraphQLRouter
from chain_vission import app
import uvicorn

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
app.include_router(signout.router)
app.include_router(signin.router)
app.include_router(nonce.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
