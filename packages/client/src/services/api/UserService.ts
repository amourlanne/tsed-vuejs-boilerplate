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
    public async getUsers(): Promise<[]> {
        return new Promise((resolve, reject) => {
            this.axios
                .get('/users')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }

    public async getOneByUsername(username) {
        return new Promise((resolve, reject) => {
            this.axios
                .get(`/users/${username}`)
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
