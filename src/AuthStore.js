import { observable, action, computed } from 'mobx'

export default class AuthStore{
    BASE_URL = 'http://localhost:8001';
    @observable authToken = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authToken = localStorage.getItem('auth_token');
    }

    @action setToken(token){
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
    }

    @action deleteToken() {
        this.rootStore.itemStore.clearCartItems();
        localStorage.removeItem('auth_token');
        this.authToken = null;
    }


    @computed get isLoggedIn() {
        return this.authToken != null;
    }

}