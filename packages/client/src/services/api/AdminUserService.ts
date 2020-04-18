import AbstractAPIService from '@/services/api/AbstractAPIService';

class AdminUserService extends AbstractAPIService {
    public async getAll() {
        return new Promise((resolve, reject) => {
            this.axios
                .get('/admin/users')
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
                .get(`/admin/users/${username}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }

    public async createUser(userData, avatarFile = null) {
        const formData = new FormData();

        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        return new Promise((resolve, reject) => {
            this.axios
                .post(`/admin/users`, formData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }

    public async updateUser(userId, userData, avatarFile = null, removeAvatar = false) {
        const formData = new FormData();

        Object.entries(userData).forEach(([key, value]) => {
            if (value && value !== '') {
                formData.append(key, value as string);
            }
        });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        if (removeAvatar) {
            formData.append('avatar', null);
        }

        return new Promise((resolve, reject) => {
            this.axios
                .put(`/admin/users/${userId}`, formData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }

    public async delete(username) {
        return new Promise((resolve, reject) => {
            this.axios
                .delete(`/admin/users/${username}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response ? error.response.data.error : error);
                });
        });
    }
}

export default new AdminUserService();
