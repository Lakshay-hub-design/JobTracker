import { useContext, useRef } from 'react'
import { AuthContext } from '../../features/auth/context/AuthContext'
import { useEffect } from 'react'
import api from './axios'

const useAxiosPrivate = () => {
    const context = useContext(AuthContext)
    const { accessToken, setAccessToken } = context
    const tokenRef = useRef(accessToken)

    useEffect(() => {
      tokenRef.current = accessToken
    }, [accessToken])

    useEffect(() => {
      const requestInterceptor = api.interceptors.request.use(
        (config) => {
            if(!config.headers.Authorization){
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

            if(
                error?.response?.status === 401 &&
                !prevRequest._retry &&
                !prevRequest.url.includes("/api/auth/refresh-token") 
            ){
                prevRequest._retry = true;

                try {
                    const res = await api.get(
                        "/api/auth/refresh-token",
                    );

                    setAccessToken(res.data.accessToken);

                    prevRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

                    return api(prevRequest);
                } catch (err) {
                    console.log("Refresh failed", err.response?.data || err.message);
                }
            }
            return Promise.reject(error);
        }
      )

      return () => {
        api.interceptors.request.eject(requestInterceptor)
        api.interceptors.response.eject(responseInterceptor)
      }
    }, [])
    return api
}

export default useAxiosPrivate