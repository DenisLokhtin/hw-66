import React, {useEffect, useMemo, useState} from 'react';
import axiosApi from "../AxiosApi";
import Spinner from "../Components/UI/Spinner/Spinner";

const WithErrorHandler = (WrappedComponent, axios) => {
    return function ErrorHandlerHOC (props) {
        const [spinner, setSpinner] = useState(false)

        useMemo(() => {
            axiosApi.interceptors.request.use(req => {
                setSpinner(true);
                return req;
            });

            axiosApi.interceptors.response.use(res => {
                setSpinner(false);
                return res
            }, err => {
                console.log('[in error]', err);
                return err;
            });
        }, [])

        const showSpinner = () => {
            if (spinner) {
                return <Spinner/>
            }
        };

        return (
            <>
                {showSpinner()}
                <WrappedComponent {...props}/>
            </>
        );
    };
};

export default WithErrorHandler;