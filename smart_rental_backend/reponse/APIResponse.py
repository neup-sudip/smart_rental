from reponse.ResponseCode import ResponseCode


class APIResponse:
    def __init__(self, response_code, response_status, response_message, response_data=None, http_status=200):
        self.response_code = response_code
        self.response_status = response_status
        self.response_message = response_message
        self.response_data = response_data
        self.http_status = http_status

    def to_dict(self):
        return {
            "responseCode": self.response_code,
            "responseStatus": self.response_status,
            "responseMessage": self.response_message,
            "responseData": self.response_data
        }

    @classmethod
    def success(cls, message: str, data=None):
        return cls(
            response_code=ResponseCode.SUCCESS_CODE,
            response_status=True,
            response_message=message,
            response_data=data,
            http_status=200
        )

    @classmethod
    def failed(cls, message: str):
        return cls(
            response_code=ResponseCode.FAILED_CODE,
            response_status=False,
            response_message=message,
            http_status=400
        )

    @classmethod
    def error(cls, message: str):
        return cls(
            response_code=ResponseCode.ERROR_CODE,
            response_status=False,
            response_message=message,
            http_status=500
        )
