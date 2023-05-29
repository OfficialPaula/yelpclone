import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:6002/api/v1/restaurants",
});