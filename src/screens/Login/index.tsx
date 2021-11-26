import React from 'react';
import LoginForm from '../../components/LoginForm'

type LoginProps = {
  updateToken: (token:string|null) => void
}
const Login = (props:LoginProps) => {
  const {
    updateToken
  } = props;
  return (
    <>
      <LoginForm updateToken={updateToken} />
    </>
  )
}
export default Login;