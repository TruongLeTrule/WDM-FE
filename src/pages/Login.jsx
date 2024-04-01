import React, { useState } from 'react';
import styled from "styled-components";
import Wedding from "../assets/images/image";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/v1/auth/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.data.token;
          if (token) {
            setUsername('');
            setPassword('');
            window.location.href = 'http://localhost:5173/dashboard';
          }
        }
      })
      .catch(error => {
        alert(error.response.data.msg);
      });
  };

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginPage>
      <LoginForm onSubmit={(e) => handleLoginSubmit(e)}>
        <div className="image">
          <img src={Wedding} alt="" />
        </div>
        <p>Đăng Nhập</p>
        <InputField
          onChange={(e) => handleUserNameChange(e)}
          type="text"
          id="username"
          name="username"
          required
          placeholder="Username"
          value={username}
        />
        <InputField
          onChange={(e) => handlePasswordChange(e)}
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          value={password}
        />
        <SubmitButton type="submit" id="login" value="Login" />
      </LoginForm>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  background-color: rgb(255, 226, 233);
  width: 100vw; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .image{
    height: 40%;
    width: 100%;
    background-color: #ffe2e9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img{
    background-color: #ffe2e9;
    width: 100%;
    height: 100%;
  }

  p{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    font-weight: 600;
  }
`;

const InputField = styled.input`
  height: 10%; 
  background-color: white;
  border-radius: 40px;
  padding: 5%;
  font-size: 1.5em;
`;

const SubmitButton = styled.input`
  height: 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(181, 192, 208);
  border-radius: 40px;
  font-size: 1.5em;
  
  &:hover {
    cursor: pointer;
  }
`;
