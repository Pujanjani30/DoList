import * as authServices from '../services/auth.services.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None'
};

const getUser = (req, res) => {
  try {
    return successResponse({
      res,
      message: "User fetched Successfully.",
      data: req.user
    })

  } catch (error) {
    return errorResponse(req, res, error);
  }
}

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const response = await authServices.signUp(data);

    res.cookie('accessToken', response.accessToken, cookieOptions);
    // res.cookie('refreshToken', response.refreshToken, cookieOptions);

    return successResponse({
      res,
      message: 'Signed up successfully',
      data: response.userData
    });

  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error);
  }
}

const login = async (req, res) => {
  try {
    const data = req.body;
    const response = await authServices.login(data);

    res.cookie('accessToken', response.accessToken, cookieOptions);
    // res.cookie('refreshToken', response.refreshToken, cookieOptions);

    return successResponse({
      res,
      message: 'Logged in successfully',
      data: response.userData
    });

  } catch (error) {
    return errorResponse(req, res, error);
  }
}

const logout = async (req, res) => {
  try {
    const data = req.user;
    await authServices.logout(data);

    res.clearCookie('accessToken', cookieOptions);
    // res.clearCookie('refreshToken', cookieOptions);

    return successResponse({
      res,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

// const refreshAccessToken = async (req, res) => {
//   try {
//     const incomingRefreshToken = req.cookies.refreshToken;
//     if (!incomingRefreshToken) {
//       throw { type: 'UNAUTHORIZED' };
//     }

//     const response = await authServices.refreshAccessToken({ incomingRefreshToken });

//     res.cookie('accessToken', response.accessToken, cookieOptions);

//     return successResponse({
//       res,
//       message: 'Access token refreshed successfully',
//     });
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// }

export { getUser, signUp, login, logout, /* refreshAccessToken */ };