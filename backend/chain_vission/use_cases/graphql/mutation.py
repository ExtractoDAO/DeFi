from chain_vission.utils.authentication import verify_token
from chain_vission.domain.contract import Contract
from chain_vission import adapter_app
from strawberry.types import Info
import strawberry


@strawberry.type
class Response:
    success: bool
    message: str

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_contract(
        self,
        address: str,
        commodity_amount: float,
        locktime: int,
        owner: str,
        price: int,
        info: Info,
    ) -> Response:
        token = info.context["request"].state.token
        if (message := verify_token(token)) is not None:
            return Response(message=message, success=False)

        contract = Contract(
            address=address,
            burn=False,
            kg=commodity_amount,
            locktime=locktime,
            owner=owner,
            price=price,
        )
        adapter_app.set_data(f"/contracts/{contract.address}", contract.__dict__)
        return Response(message="", success=True)
