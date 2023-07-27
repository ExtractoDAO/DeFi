import logging
import inspect


class CustomLogger:
    def __init__(self, log_file, debug=False):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.DEBUG)
        handler = logging.FileHandler(log_file)
        fmt = (
            "%(asctime)s %(levelname)s %(path)s.%(func)s:%(line)d %(message)s"
        )
        formatter = logging.Formatter(fmt)
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

        if debug:
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)

    def _log(self, level, msg):
        caller = inspect.stack()[2]
        path = caller.filename.split("./")[-1]
        path = path.replace(".py", "")
        path = path.replace("/", ".")
        self.logger.log(
            level,
            msg,
            extra={
                "path": path,
                "func": caller.function,
                "line": caller.lineno,
            },
        )

    def debug(self, msg):
        self._log(logging.DEBUG, msg)

    def info(self, msg):
        self._log(logging.INFO, msg)

    def warn(self, msg):
        self._log(logging.WARNING, msg)

    def error(self, msg):
        self._log(logging.ERROR, msg)

    def critical(self, msg):
        self._log(logging.CRITICAL, msg)
