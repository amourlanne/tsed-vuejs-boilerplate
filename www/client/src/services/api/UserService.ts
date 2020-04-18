import AbstractAPIService from '@/services/api/AbstractAPIService';

class AccountService extends AbstractAPIService {
    public async updateAccount(profileData, avatarFile = null, removeAvatar = false) {
        const formData = new FormData();

        Object.entries(profileData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        if (removeAvatar) {
            formData.append('avatar', null);
        }

        return new Promise((resolve, reject) => {
            this.axios
                .post('/account', formData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }
}

export default new AccountService();
