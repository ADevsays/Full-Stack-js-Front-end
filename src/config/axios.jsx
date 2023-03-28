import axios from 'axios';

const url = 'https://full-stack-js-proyect-back-end-production.up.railway.app';

const clientAxios = axios.create({
    baseURL: `${url}/api`
});

export default clientAxios;