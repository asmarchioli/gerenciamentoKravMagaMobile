import axios from 'axios';

const IP = '192.168.100.20';

const api = axios.create({
    baseURL: `http://${IP}:8080/api`,
});

export default api;