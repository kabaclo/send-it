import crypto from 'crypto';

export default class User {
  constructor(options = {}) {
    const { username = '', usersModel = '' } = options;
    this.username = username;
    this.userList = usersModel;
  }
  
  auth(options = {}) {
    
    const response = {
      success: false,
    };
    const { username = '', password = '' } = options;
    this.secret = crypto.createHash('sha256').update(password).digest('hex');
    if (username) {
      this.username = username;
    }
    if (!this.username) {
      response.message = 'undefined user';
      return response;
    }

    const user = this.findByUsername();
    
    if (!user) {
      response.message = 'user doesn\'t exist';
      return response;
    }
    if (user.secret !== this.secret) {
      response.message = 'incorrect password';
      return response;
    }

    response.success = true;
    response.message = 'authorized user';
    response.data = user;
    return response;
  }

  findByUsername() {
    
    return this.userList.find((usr) => {
      if (usr.username === this.username) {
        return usr;
      }
    });
  }
}
