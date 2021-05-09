import User from './User';

class NullUser extends User {

    constructor() {
        super('null', 'NullUser');
    }

    isAuthenticated() {
        return false;
    }

}

export default NullUser;
