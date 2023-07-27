from strawberry import Schema
from .mutation import Mutation
from .query import Query

schema = Schema(query=Query, mutation=Mutation)
