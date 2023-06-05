import axios from 'axios';

export default class InfoService {
    static async getAllSignThemes() {
        return await axios.get('http://localhost:8080/signs-infothemes');
    }

    static async getAllThemeSign(id) {
        return await axios.get(`http://localhost:8080/signs?infothemeId=${id}`);
    }
}
