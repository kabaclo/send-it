import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../Model/User';

const response = {
  code: 200,
  data: {
    message: 'success',
  },
};
const createUser = async (req, res) => {
  const { newUser } = req.body;

  const insertUserQuery = `INSERT INTO Users
                (names, username, email, secret, role) VALUES
                ($1, $2, $3, $4, $5)`;
  const secret = crypto.createHash('sha256').update(newUser.password + newUser.username).digest('hex');

  const insertUserValues = [
    newUser.names,
    newUser.username,
    newUser.email,
    secret,
    newUser.role,
  ];
  try {
    const user = new User();
    await user.query(insertUserQuery, insertUserValues);
    response.code = 200;
    response.data.message = 'registered';

    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 409;
    response.data.message = 'Not registered';
    return res.status(response.code).send(response.data);
  }
};

const getUserSecretByUsername = async (username = '') => {
  const querySelectUserByUsername = 'SELECT secret FROM users WHERE username = $1 ';
  const userModel = new User();
  const queryResult = await userModel.query(querySelectUserByUsername, [username]);
  const [secret] = queryResult.rows;
  return secret;
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const secret = crypto.createHash('sha256').update(password + username).digest('hex');

  const querySelectUserByUsername = 'SELECT * FROM users WHERE username = $1 ';
  const user = new User();
  try {
    const querySelectUserByUsernameResult = await user.query(querySelectUserByUsername, [username]);
    if (querySelectUserByUsernameResult.rowCount < 1) {
      response.code = 403;
      response.data.message = 'invalid username';
    } else if (querySelectUserByUsernameResult.rows[0].secret !== secret) {
      response.code = 403;
      response.data.message = 'invalid password';
    } else {
      response.code = 200;
      response.data.message = 'authorized';
      const userPayload = {
        username: querySelectUserByUsernameResult.rows[0].username,
        email: querySelectUserByUsernameResult.rows[0].email,
        names: querySelectUserByUsernameResult.rows[0].names,
        role: querySelectUserByUsernameResult.rows[0].role,
      };
      response.data.token = jwt.sign(
        userPayload,
        secret,
        {
          algorithm: 'HS256',
          expiresIn: '60s',
        },
      );
    }
    res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 500;
    response.data.message = 'Error';
    res.status(response.code).send(response.data);
  }
};

const authenticatUser = async (req, res, next) => {
  const [headerName, token] = req.headers.authorization.split(' ');
  const user = jwt.decode(token);
  response.code = 401;
  response.data.message = 'unauthorized';
  if (!user) {
    return res.status(response.code).send(response.data);
  }
  const result = await getUserSecretByUsername(user.username);
  if (result) {
    const { secret } = result;

    jwt.verify(token, secret, (error, userPayload) => {
      if (userPayload) {
        req.User = userPayload;
        next();
      } else {
        response.code = 401;
        response.data.message = error.name;
        return res.status(response.code).send(response.data);
      }
    });
  }
};

export { createUser, login, authenticatUser };
