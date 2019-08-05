class DataHelper {

    static baseURL(){
        return 'http://localhost:8001';
    }

    static setAuthToken(token){
        localStorage.setItem('auth_token', 'Bearer ' + token.access_token);
    }

    static getAuthToken(){
        return localStorage.getItem('auth_token');
    }
}



export default DataHelper;