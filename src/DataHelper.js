import { observable, computed } from 'mobx';



let instance;
class DataHelper {
    @observable authToken = null;


    constructor() {
        if (instance) return instance;
        instance = this;
    }

    baseURL() {
        return 'http://localhost:8001';
    }

    setAuthToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
    }

    // getAuthToken() {
    //     if (this.authToken == null) {
    //         this.authToken = localStorage.getItem('auth_token');
    //     }
    //     return this.authToken;
    // }

    deleteToken() {
        localStorage.removeItem('auth_token');
        this.authToken = null;
    }

    @computed
    get isLoggedIn(){
        return this.authToken != null || localStorage.getItem('auth_token') != null;
    }

    static baseURL() {
        const dataHelper = new DataHelper();
        return dataHelper.baseURL();
    }

    static setAuthToken(token) {
        const dataHelper = new DataHelper();
        dataHelper.setAuthToken(token);
    }

    // static getAuthToken() {
    //     const dataHelper = new DataHelper();
    //     return dataHelper.getAuthToken();
    // }
}


export default DataHelper;