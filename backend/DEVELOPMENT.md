# How to develop


1. install poetry

```
pip install poetry
```

2. install dependencies

```
poetry shell
poetry install
```

3. install pre-commit

```
pre-commit install
pre-commit install --hook-type commit-msg
```

4. run tests

```
poetry run behave
```

5. run server

- you need have a `.env` like

```
ENV=
FIREBASE_JSON_PATH=""
BASE_URL=
```

```
poetry run up
```