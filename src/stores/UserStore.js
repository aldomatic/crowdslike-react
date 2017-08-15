import { autorun, observable, action, computed } from 'mobx';
import axios from 'axios';

// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if (401 === error.response.status) {
//        return console.log("Your not authorized.");
//     }
//     return Promise.reject(error);
// });

class UserStore {
    @observable credentials = {
        email: '',
        password: ''
    };
    @observable validationError = '';

    @action loginUser = (callback) =>{
        this.validationError = '';
        if(this.credentials.email !== '' || this.credentials.password !== ''){
            this.apiAuth.authenticate(()=>{
                console.log(`Logging in ${this.credentials.email}`);
                this.credentials.password = '';
                callback();
            });
        }
    }

    @action logoutUser = () =>{
        this.apiAuth.signout(() => {
            console.log(`Logging out ${this.credentials.email}`);
            this.credentials.email = '';
        });
    }

    @observable authStatus = {
        isAuthenticated: false
    }
    @observable apiAuth = {
        authenticate: (cb) => {
            axios({
                method: 'post',
                url: 'http://192.34.57.156:3001/api/Users/login',
                data: {
                    email: this.credentials.email,
                    password: this.credentials.password
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 300
                  }
            }).then((response) =>{
                if(response && response.data){
                    localStorage.setItem('authToken', response.data.id);
                    axios.defaults.headers.common['Authorization'] =  localStorage.getItem('authToken');
                    this.authStatus.isAuthenticated = true;
                    cb();
                }
            }).catch((error) =>{
                if(error){
                    if(error.response.data.error.name == "ValidationError" || error.response.data.error.code == "LOGIN_FAILED"){
                        this.validationError = "Please you provided valid login credentials.";
                    }
                }
            });
        },
        signout: (cb)=> {
            axios.defaults.headers.common['Authorization'] = "";
            localStorage.clear('authToken');
            this.authStatus.isAuthenticated = false;
            cb();
         }
    }

}
const userStore = new UserStore();
export default userStore;

// autorun(() =>{
//     console.log(userStore);
// });