import { autorun, observable, action, computed } from 'mobx';

class UserStore {
    @observable credentials = {
        email: "",
        password: ""
    };

    @action loginUser = () =>{
        this.fakeAuth.authenticate(()=> {
            console.log(`Logging in ${this.credentials.email}`);
        })
    }
    
    @observable fakeAuth = {
        isAuthenticated: false,
            authenticate(cb) {
            this.isAuthenticated = true
            setTimeout(cb, 100) // fake async
        },
        signout(cb) {
            this.isAuthenticated = false
            setTimeout(cb, 100)
        }
    }

}
const userStore = new UserStore();
export default userStore;

// autorun(() =>{
//     console.log(userStore);
// });