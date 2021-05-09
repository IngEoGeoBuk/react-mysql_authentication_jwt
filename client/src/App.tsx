import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';

function App() {
  const [usernameReg, setUsernameReg] = useState<string>('')
  const [passwordReg, setPasswordReg] = useState<string>("")

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>("")

  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    if(!usernameReg || !passwordReg) {
      alert("아이디 또는 비밀번호를 입력하세요.")
      return false;
    }
    Axios.post(`http://localhost:5000/register`, {
      username : usernameReg, 
      password: passwordReg
    }).then(res => console.log(res))
  }

  const login = () => {
    if(!username || !password) {
      alert("아이디 또는 비밀번호를 입력하세요.")
      return false;
    }

    Axios.post(`http://localhost:5000/login`, {
      username, password
    }).then((res) => {
      if(!res.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", res.data.token)
        setLoginStatus(true);
      }
    }) 
  }

  // useEffect(() => {
  //   Axios.get("http://localhost:5000/login")
  //   .then((res) => {
  //     if(res.data.loggedIn) {
  //       setLoginStatus(res.data.user[0].username)
  //     } 
  //   })
  // }, [])

  const userAuthenticated = () => {
    Axios.get("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token" : localStorage.getItem("token")
      }}).then(res => {
        console.log(res)
      }) 
  }


  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input 
          type="text" 
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }} 
        />
        <label>Password</label>
        <input 
          type="text" 
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }} 
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input 
          type="text" 
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }} 
        />
        <input 
          type="password" 
          placeholder="Password..." 
          onChange={(e) => {
            setPassword(e.target.value);
          }} 
        />
        <button onClick={login}>Register</button>
        {loginStatus && (
          <button onClick={userAuthenticated}>Check if Authenticated</button>
        )}
      </div>
    </div>
  );
}

export default App;
