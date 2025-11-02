import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/sagas/actions";
import { instance } from "./axios";
import Cookies from "js-cookie";

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRequest = useCallback(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 403) {
          dispatch(LOGOUT());

          Cookies.remove("token");

          navigate("/auth/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    const cleanup = handleRequest();
    return cleanup;
  }, [handleRequest]);

  return null;
};

export default AxiosInterceptor;
