import '../css/css'
import SSTextField from '../base-components/ss-text-field';
import SSButton from '../base-components/ss-button';
import SSForm from '../base-containers/ss-form';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import config from '../config/config'
import SSBox from '../base-containers/ss-box';

let className = 'login border border-primary rounded-1' 

let Login = ({ children, ...props}) => {
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (userName, password) => {
      try {
        const response = await fetch(config.login.url , {
          method: config.login.method,
          body: config.login.setBody(userName, password)
        });
        const body = await response.json();
        if (!response.ok) {
          alert(body.message);
        } else {
          localStorage.setItem('token', response.headers.get('token'));
          navigate("/");
        }
      } catch (error) {
        console.log('Error in fetching data : ', error.message);
      }
  }
  
  const handleSubmit = (e) => {
    handleLogin(userNameRef.current.value, passwordRef.current.value);
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    token && token.trim() !== '' && navigate('/')
  })

  
  return (
    <SSBox justifyCenter alignCenter flexRow fullHeight fullWidth className="app d-flex">
      <SSForm className={className} handleSubmit={handleSubmit}> 
          <SSTextField label="User Name" inputRef={userNameRef} required/>
          <SSTextField type="password" label="Password" inputRef={passwordRef} required/>
          <SSButton size="large" type="submit">Submit</SSButton>
      </SSForm>
    </SSBox>
  );
}

export default Login;