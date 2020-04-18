import axios from '@/packages/axios';

export default abstract class AbstractAPIService {
    protected axios;

    constructor() {
        this.axios = axios;
    }
}
