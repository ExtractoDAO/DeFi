def generate_graphql_query(query: str, fields: list, total: int, at: int) -> str:
    fields_str = "\n".join(fields)
    return f"""
    query {{
        {query}(total: {total}, at: {at}) {{
            items {{
                {fields_str}
            }}
        }}
    }}
    """
