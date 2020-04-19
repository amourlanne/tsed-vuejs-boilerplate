import AbstractAPIService from '@/services/api/AbstractAPIService';

class UserService extends AbstractAPIService {
    public async usernameAvailable(username): Promise<{ available: boolean }> {
        return new Promise((resolve, reject) => {
            this.axios
                .post('/users/username/available', { username })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }
}

export default new UserService();
