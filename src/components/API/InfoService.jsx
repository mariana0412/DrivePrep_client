import axios from 'axios';

export default class InfoService {
    static async getAllSignThemes() {
        const response = await axios.get('http://localhost:8080/signs-infothemes')
        return response;
    }

    static async getAllThemeSign(id) {

        const response = await axios.get(`http://localhost:8080/signs?infothemeId=${id}`);
        return response;
    }
}
