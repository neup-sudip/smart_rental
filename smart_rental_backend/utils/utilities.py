from flask import request

def get_client_ip():
    # X-Forwarded-For may contain multiple IPs, take the first one
    if "X-Forwarded-For" in request.headers:
        ip_list = request.headers["X-Forwarded-For"].split(",")
        if ip_list:
            return ip_list[0].strip()

    return request.remote_addr
