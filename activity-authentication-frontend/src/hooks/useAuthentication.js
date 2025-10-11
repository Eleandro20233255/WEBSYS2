export function UseAuthentication() {
  function login(username, password) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid username or password');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Logged in:', data);
        return data;
      })
      .catch((err) => {
        console.error('Login error:', err);
        throw err;
      });
  }

  function logout() {
    return fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include', 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to log out');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Logged out:', data);
        return data;
      })
      .catch((err) => {
        console.error('Logout error:', err);
        throw err;
      });
  }

  return {
    login,
    logout,
  };
}
