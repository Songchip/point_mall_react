import axios from 'axios';



class HttpService {
    constructor(rootStore){
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;

        axios.defaults.baseURL = 'http://localhost';


    }

    indexItems() {
        return axios.get('/items/')
            .then(response => {
                return response.data;
            });
    }

    indexMyItems(){
        return axios.get('/me/items').then(response =>{
            return response.data;
        });
    }
}