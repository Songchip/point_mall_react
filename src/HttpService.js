import axios from 'axios';
import { reaction } from 'mobx';
import { resolve } from 'q';



class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;
        this.clientID = 'kArNpsCWuOWxtTRaytkTSzLauatCH76i7qEz7ULb';
        this.refreshSubscribers = [];
        this.isRefreshingToken = false;

        axios.defaults.baseURL = 'http://localhost:8001';

        axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
        reaction(() => this.authStore.authToken, () => {
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
        });

        axios.interceptors.response.use(response => {
            return response;
        }, originalError => {
            const {config, response} = originalError;
            const originalRequest = config;
            if (response.status === 401) {
                if (this.authStore.refreshToken == null) {
                    alert("로그인이 필요합니다.");
                    this.rootStore.history.push('/login');
                }
                else {
                    if(!this.isRefreshingToken){
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(axios(originalRequest));
                                for(let subscriber of this.refreshSubscribers){
                                    subscriber(token);
                                }
                                
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert("로그인이 필요합니다.");
                                this.rootStore.history.push('/login');
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(null);
                                }
                            }).finally(()=>{
                                this.isRefreshingToken = false;
                                this.refreshSubscribers = [];
                            });
                        });
                    }

                    return new Promise((resolve, reject) =>{
                        this.refreshSubscribers.push((token)=>{
                            if(token == null){
                                reject(originalError);
                            }
                            else{
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(axios(originalRequest));
                            }
                        });
                    });
                    
                }
            }
            if (originalError.response.status === 402) {
                alert("포인트가 부족합니다.");
                this.rootStore.history.push('/users/point_charge/');
            }
            return Promise.reject(originalError);
        });
    }

    indexItems() {
        return axios.get('/items/')
            .then(response => {
                return response.data;
            });

    }

    indexMyItems() {
        return axios.get('/me/items/').then(response => {
            return response.data;
        });
    }

    getItem(itemId) {
        return axios.get('/items/' + itemId + '/')
            .then(response => {
                return response.data;
            });
    }

    getMe() {

        return axios.get('/me/').then(response => {
            return response.data;
        });
    }

    indexCategoryItems(categoryId) {
        return axios.get('/categories/' + categoryId + '/items/')
            .then(response => {
                return response.data;
            });
    }

    indexCategories() {
        return axios.get('/categories/')
            .then(response => {
                return response.data;
            });
    }

    purchaseItem(itemId, count) {
        return axios.post('/items/' + itemId + '/purchase/',
            {
                count
            }).then(response => {
                return response.data;
            });
    }

    purchaseItems(items) {
        return axios.post('/items/purchase/', { items })
            .then(response => {
                return response.data;
            });
    }


    register(username, password){
        return axios.post('/users/' , {
            username,
            password
        }).then(response => {
            return response.data;
        });
    }

    refreshToken() {
        return axios.post('/o/token/', {
            grant_type: 'refresh_token',
            client_id: this.clientID,
            refresh_token: this.authStore.refreshToken
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token);
            return token;
        });
    }


    login(username, password){
        return axios.post('/o/token/',{
            grant_type: 'password',
            client_id: this.clientID,
            username,
            password
        }).then(response =>{
            const token = response.data;
            this.authStore.setToken(token);
            return token;
        });
    }


    addPoint(userId, addPoint){
        return axios.post('/users/' + userId + '/point_charge/',
            {
                point: addPoint
            }).then(response =>{
                return response.data;
            });
    }

}

export default HttpService;