from chain_vission.graphql.schema import schema
from chain_vission.login.router import signin
from chain_vission.login.router import nonce
from strawberry.fastapi import GraphQLRouter
from chain_vission import app
import uvicorn

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
app.include_router(nonce.router)
app.include_router(signin.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
