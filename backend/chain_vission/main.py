import uvicorn
from chain_vission.domain.schema import schema
from strawberry.fastapi import GraphQLRouter
from chain_vission import app

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
