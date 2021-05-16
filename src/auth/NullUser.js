import User from './User';
import LikedMedia from "../user/LikedMedia";

class NullUser extends User {

    constructor() {
        super('null', 'NullUser', '', new LikedMedia());
    }

    isAuthenticated() {
        return false;
    }

}

export default NullUser;
