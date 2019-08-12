import { observable, action, computed } from 'mobx'
import axios from 'axios';
import DataHelper from './DataHelper';



export default class AuthStore {
    BASE_URL = 'http://localhost:8001';
    @observable authToken = null;
    @observable user = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authToken = localStorage.getItem('auth_token');
        this.user = localStorage.getItem('username');
    }

    @action setToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
        this.getUser();
    }

    @action deleteToken() {
        this.rootStore.itemStore.clearCartItems();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
        this.authToken = null;
        this.user = null;
    }

    getUser = () => {
        axios.get(
            DataHelper.baseURL() + '/me/', {
                headers: {
                    'Authorization': this.authToken
                }
            }
        ).then((response) => {
            const user = response.data;
            this.user = user.username;
            localStorage.setItem('username', this.user);
        });
    }

    @computed get isLoggedIn() {
        return this.authToken != null;
    }

    

}