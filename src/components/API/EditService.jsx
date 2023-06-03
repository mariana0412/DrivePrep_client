import axios from 'axios';

export default class PostService {
    static async getAllCategories() {
        const response = await axios.get('http://localhost:8080/categories')
        return response;
    }

    static async getUserById(id) {

        const response = await axios.get(`http://localhost:8080/users/${id.id}`);
        return response;
    }
}
