import { createContext, useContext } from "react";
import Auth from '../../../auth/Auth';
import useProvideAuth from "./useProvideAuth";

const authContext = createContext(new Auth());
const useAuth = () => useContext(authContext);

const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export {
    useAuth,
    ProvideAuth
}
