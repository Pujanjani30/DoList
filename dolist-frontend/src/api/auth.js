import fetchData from './fetchData.js'

const login = async (data) => {
  const response = await fetchData('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

const signUp = async (data) => {
  const response = await fetchData('http://localhost:3000/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}

const logout = async () => {
  const response = await fetchData('http://localhost:3000/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return response;
}

const getCurrentUser = async (setUser, setLoading) => {
  try {
    const res = await fetchData('http://localhost:3000/api/v1/auth/me',
      { method: 'GET' }
    );
    if (res?.data) {
      setUser(res.data);
    }
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

const refreshToken = async () => {
  const res = await fetchData('http://localhost:3000/api/v1/auth/refresh-token', {
    method: 'POST',
  });

  return res;
}

export {
  login,
  signUp,
  logout,
  getCurrentUser,
  refreshToken
}