import { useState, useEffect } from 'react';
import User from '../../../auth/User';
import NullUser from '../../../auth/NullUser';
import Auth from '../../../auth/Auth';

const useProvideAuth = () => {
    const auth = new Auth(new NullUser());
    const [ user, setUser ] = useState(auth.getUser());

    useEffect(() => {
        auth.setUser(user);
    }, [user]);

    return auth;
};

export default useProvideAuth;
