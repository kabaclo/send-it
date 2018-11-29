import User from '../Model/User';

const createUser = async (req, res) => {
  const { newUser } = req.body;

  const insertUserQuery = `INSERT INTO Users
                (names, username, email, secret, role) VALUES
                ($1, $2, $3, $4, $5)`;
  const insertUserValues = [
    newUser.names,
    newUser.username,
    newUser.email,
    newUser.secret,
    newUser.role,
  ];
  try {
    const user = new User();
    await user.query(insertUserQuery, insertUserValues);
    // console.warn('Success here');

    return res.status(200).send({ success: true });
  } catch (error) {
    // console.error('error here');

    return res.status(500).send({ success: false });
  }
};
export default createUser;
