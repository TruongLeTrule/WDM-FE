import styled from "styled-components";
import Wedding from "../assets/images/image";
const Login = () => {
  return (

    <LoginPage>
      <LoginForm onSubmit={(e) => {
        
      }} >
        <div className="image">
          <img src={Wedding} alt="" />
        </div>
        <p>Đăng Nhập</p>
        <input type="text" id="username" name="username" required placeholder="Username" />

        <input type="password" id="password" name="password" required placeholder="Password" />

        <input type="submit" id="login" value="Login" />

      </LoginForm>
    </LoginPage>
  )
};
export default Login;

const LoginPage = styled.div`
  background-color: rgb(255, 226, 233);
  width: 100vw; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
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
 #username, #password{ 
  height: 10%; 
  background-color: white;
  border-radius: 40px;
  padding: 5%;
  font-size: 1.5em;
 }
 #login{
  height: 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(181, 192, 208);
  border-radius: 40px;
  font-size: 1.5em;
  &:hover{
    cursor: pointer;
  }
 }
`
