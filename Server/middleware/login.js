import User from '../controllers/user';
import USERS from '../helpers/USERS';

const login = (req, res, next) => {
  const response = {
    code: 200,
    data: {},
  };

  try {
    const user = new User({
      username: req.query.username,
      usersModel: USERS.users,
    });
    response.data = user.auth({
      password: req.query.password,
    });

    if (!response.data.success) {
      return res.status(response.code).send(response);
    }
    next();
  } catch (error) {
    response.status = 500;
    response.data.error = error;
    return res.status(response.status).send(response.data);
  }
};
export default login;
