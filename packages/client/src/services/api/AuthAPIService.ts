import AbstractAPIService from '@/services/api/AbstractAPIService';

class AuthAPIService extends AbstractAPIService {
    public async login(username: string, password: string, rememberMe: boolean = false) {
        return new Promise((resolve, reject) => {
            this.axios
                .post('/login', { username, password, rememberMe })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }

    public async account() {
        return new Promise((resolve, reject) => {
            this.axios
                .get('/account')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }
}

export default new AuthAPIService();
