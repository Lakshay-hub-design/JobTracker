import { useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../features/auth/context/AuthContext'
import api from './axios'

const useAxiosPrivate = () => {
    const context = useContext(AuthContext)
    const { accessToken, setAccessToken, setUser } = context
    const tokenRef = useRef(accessToken)

    useEffect(() => {
      tokenRef.current = accessToken
    }, [accessToken])

    const refreshPromiseRef = useRef(null)

    useEffect(() => {
      const requestInterceptor = api.interceptors.request.use(
        (config) => {
            config.headers = config.headers || {}

            if(!config.headers.Authorization && tokenRef.current){
                config.headers.Authorization = `Bearer ${tokenRef.current}`
            }
            return config
        },
        (error) => Promise.reject(error)
      )

      const responseInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error?.config

            if (!prevRequest) {
                return Promise.reject(error);
            }

            const isRefreshRequest =
                prevRequest.url?.includes("/api/auth/refresh-token");

            if(
                error?.response?.status === 401 &&
                !prevRequest._retry &&
                !isRefreshRequest
            ){
                prevRequest._retry = true;

                try {
                    if (!refreshPromiseRef.current) {
                        refreshPromiseRef.current = api.get(
                            "/api/auth/refresh-token"
                        );
                    }

                    const res = await refreshPromiseRef.current

                    refreshPromiseRef.current = null

                    const newAccessToken = res.data.accessToken;

                    setAccessToken(res.data.accessToken);

                    setUser(res.data.user)

                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return api(prevRequest);
                } catch (err) {
                    refreshPromiseRef.current = null;
                    console.log("Refresh failed", err.response?.data || err.message);

                    setAccessToken(null);
                    setUser(null);

                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
      )

      return () => {
        api.interceptors.request.eject(requestInterceptor)
        api.interceptors.response.eject(responseInterceptor)
      }
    }, [setAccessToken, setUser])
    return api
}

export default useAxiosPrivate