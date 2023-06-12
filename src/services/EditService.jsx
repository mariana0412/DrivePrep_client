import axios from 'axios';

// Service for operations needed to edit user data
export default class EditService {
    static async getAllCategories() {
        return await axios.get('http://localhost:8080/categories');
    }

    static async getUserById(id) {
        return await axios.get(`http://localhost:8080/users/${id}`);
    }

    static async deleteUser(id){
        return await axios.delete(`http://localhost:8080/users/${id}`);
    }
}
