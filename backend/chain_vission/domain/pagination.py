import strawberry
from typing import List, Optional, TypeVar


GenericType = TypeVar("GenericType")


@strawberry.type
class PaginationWindow(List[GenericType]):
    items: List[GenericType] = strawberry.field(
        description="The list of items in this pagination window."
    )

    total_items_count: int = strawberry.field(
        description="Total number of items in the filtered dataset."
    )


def matches(item, filters):
    """
    Test whether the item matches the given filters.
    This demo only supports filtering by string fields.
    """

    for attr_name, val in filters.items():
        if val not in item[attr_name]:
            return False
    return True


def validate_total_and_at(total: int, at: int, length: int) -> None:
    if total not in range(101):
        raise Exception(f"total ({total}) must be between 0-100")
    if at != 0 and not 0 <= at < length:
        raise Exception(f"at ({at}) is out of range (0-{length - 1})")


def filter_items(dataset: List, filters: Optional[dict] = None) -> List:
    return list(filter(lambda x: matches(x, filters), dataset)) if filters else dataset


def sort_items(dataset: List, order_by: Optional[str] = None) -> List:
    return sorted(dataset, key=lambda x: x[order_by]) if order_by else dataset


def get_pagination_window(
    dataset: List[GenericType],
    total: int,
    at: int = 0,
    order_by: str = "",
    filters: dict[str, str] = {},
) -> PaginationWindow:
    """
    Get one pagination window on the given dataset for the given `total`
    and `at`, ordered by the given attribute and filtered using the
    given filters
    """

    validate_total_and_at(total, at, len(dataset))

    dataset = filter_items(dataset, filters)
    dataset = sort_items(dataset, order_by)
    total_items_count, items = len(dataset), dataset[at : at + total]

    return PaginationWindow(items=items, total_items_count=total_items_count)
