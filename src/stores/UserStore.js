import { autorun, observable, action, computed } from 'mobx';

class UserStore {
  @observable credentials = {
      email: "",
      password: ""
  };

  @observable userEmail = "";
  @observable userPassword = "";

  @action loginUser = () =>{
      console.log(`Logging in ${this.credentials.email}`);
  }

}
const userStore = new UserStore();
export default userStore;

// autorun(() =>{
//     console.log(userStore.username);
// });