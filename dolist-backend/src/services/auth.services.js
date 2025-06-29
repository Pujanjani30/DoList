import User from '../models/user.model.js';
// import jwt from 'jsonwebtoken';

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  // const refreshToken = await user.generateRefreshToken();

  // user.user_refreshToken = refreshToken;
  // To avoid validation on user.save() as we are not passing all required fields in user object
  // await user.save({ validateBeforeSave: false });

  return { accessToken, /* refreshToken */ };
}

const signUp = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ user_email: email });
  if (existingUser)
    throw { type: "ALREADY_EXISTS", customMessage: "User with this email already exists." };

  const newUser = await User.create({
    user_name: name,
    user_email: email,
    user_password: password,
    user_isLoggedIn: true
  })

  if (!newUser)
    throw { type: "SOMETHING_WENT_WRONG" };

  const { accessToken, /* refreshToken */ } = await generateAccessAndRefreshToken(newUser);

  const userData = {
    ...newUser,
    user_password: undefined,
    // user_refreshToken: undefined
  }

  return { userData, accessToken, /* refreshToken */ };
}

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ user_email: email });
  if (!user)
    throw { type: "INVALID_CREDENTIALS" };

  const isPasswordVerified = await user.verifyPassword(password);
  if (!isPasswordVerified)
    throw { type: "INVALID_CREDENTIALS" };

  await User.findOneAndUpdate({ user_email: email }, { user_isLoggedIn: true });

  const { accessToken, /* refreshToken */ } = await generateAccessAndRefreshToken(user);

  const userData = {
    ...user._doc,
    user_password: undefined,
    // user_refreshToken: undefined
  }

  return { userData, accessToken, /* refreshToken */ };
}

const logout = async (data) => {
  const { _id } = data;

  const user = await User.findById(_id);
  if (!user) {
    throw { type: "USER_NOT_FOUND" };
  }

  // user.user_refreshToken = undefined;
  user.user_isLoggedIn = false;
  await user.save({ validateBeforeSave: false });
}

// const refreshAccessToken = async (data) => {
//   const { incomingRefreshToken } = data;

//   const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

//   const user = await User.findById(decodedToken?.user_id);
//   if (!user)
//     throw { type: "FORBIDDEN" }

//   if (incomingRefreshToken !== user?.user_refreshToken)
//     throw { type: "FORBIDDEN" }

//   const { accessToken } = await generateAccessAndRefreshToken(user);

//   return { accessToken };
// }

export {
  signUp,
  login,
  logout,
  // refreshAccessToken 
}