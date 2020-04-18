import { helpers } from 'vuelidate/lib/validators';

import userService from '../../../services/api/UserService';

const uniqueUsername = async username => {
    let available = false;
    try {
        const result = await userService.usernameAvailable(username);
        available = result.available;
    } catch (error) {
        //
    }
    return !helpers.req(username) || available;
};


export default uniqueUsername;
