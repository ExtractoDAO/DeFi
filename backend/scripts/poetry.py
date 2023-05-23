import subprocess


def clean():
    """
    # running `poetry run clean` for clean cache files
    """
    subprocess.run(["pyclean", "."], check=True)


def run_prod():
    """
    # running `poetry run up` for up server
    """
    command = ["uvicorn", "chain_vission.main:app", "--host", "0.0.0.0", "--port", "80"]
    subprocess.run(command, check=True)


def run_dev():
    """
    # running `poetry run dev` for up server
    """
    command = ["uvicorn", "chain_vission.main:app", "--reload"]
    subprocess.run(command, check=True)


def lint():
    """
    # running `poetry run lint` for lint
    """
    subprocess.run(["black", "."], check=True)


def behave():
    """
    # running `poetry run bdd` for behave test
    """
    subprocess.run(["behave"], check=True)


def pytest():
    """
    # running `poetry run tdd` for behave test
    """
    subprocess.run(["pytest", "tests"], check=True)
