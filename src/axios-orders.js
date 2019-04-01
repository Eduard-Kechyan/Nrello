import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nrello-53160.firebaseio.com/'
});

export default instance;