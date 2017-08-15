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


/** Class representing a user operations. */
class UserStore {
    /** Collects user login credentials at the time of login. */
    @observable credentials = {
        email: '',
        password: ''
    };
    @observable validationError = '';
    /**
     * Login user
     * @description - Login an already registred user back into the system.
     * @param {function} callback - Callback function to be executed on a successful login.
     */
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
    /**
     * Login user
     * @description - Logout the user from the system and delete authToken from storage.
     */
    @action logoutUser = () =>{
        this.apiAuth.signout(() => {
            console.log(`Logging out ${this.credentials.email}`);
            this.credentials.email = '';
        });
    }

    /** Keeps track of the current auth status that is used to protect routes. */
    @observable authStatus = {
        isAuthenticated: false
    }
    @observable apiAuth = {
        /**
         * Authenticate a user, this is called from loginUser.
         * @description - Login an already registred user back into the system.
         * @param {function} callback - Callback function to be executed on a successful login.
         */
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
        /**
         * Logout a user, this is called from logoutUser.
         * @description - Logout an already logged in user.
         * @param {function} callback - Callback function to be executed on a successful login.
         */
        signout: (cb)=> {
            axios.defaults.headers.common['Authorization'] = "";
            localStorage.clear('authToken');
            this.authStatus.isAuthenticated = false;
            cb();
         }
    }



    /**
    * Register a new user
    * @description - Register a new user with the system.
    * @param {object} newUserData - New user form data. 
    */
    @action registerUser = (newUserData)=> {

    }

}
const userStore = new UserStore();
export default userStore;

// autorun(() =>{
//     console.log(userStore);
// });