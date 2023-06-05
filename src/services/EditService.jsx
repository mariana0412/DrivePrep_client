import axios from 'axios';

export default class EditService {
    static async getAllCategories() {
        return await axios.get('http://localhost:8080/categories');
    }

    static async getUserById(id) {
        return await axios.get(`http://localhost:8080/users/${id.id}`);
    }
}
