import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e2564.firebaseio.com/'
});

export default instance;