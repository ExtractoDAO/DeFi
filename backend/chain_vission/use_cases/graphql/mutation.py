from chain_vission.utils.authentication import verify_token
from chain_vission.domain.contract import Contract, ContractStatus
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
        txId: str,
        address: str,
        commodity_amount: float,
        locktime: int,
        owner: str,
        price: int,
        info: Info,
    ) -> Response:
        if (token := info.context["request"].state.token) is None:
            message = "Authentication attempt rejected: header not found"
            return Response(message=message, success=False)
        if (message := verify_token(token)) is not None:
            return Response(message=message, success=False)

        contract = Contract(
            status=ContractStatus.PENDING.value,
            commodity_amount=commodity_amount,
            locktime=locktime,
            address=address,
            tx_id=txId,
            owner=owner,
            price=price,
        )
        adapter_app.set_data(f"/contracts/{contract.address}", contract.to_dict)
        return Response(message="", success=True)
