import '../css/css'
import SSBox from '../base-containers/ss-box'
import HeaderBar from '../components/header-bar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

let defaultClassName = 'main-page'

let MainPage = ({ className, children, ...props}) => {
  className = `${defaultClassName} ${className ? className : ''}`

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    (!token || token.trim() === '') && navigate('/login');
  },[])

  return (

    <SSBox fullHeight fullWidth className="app">
      <HeaderBar/>
      <SSBox flexRow fullHeight fullWidth className={className}> 
          {/* <SideBar/> */}
          {children}
      </SSBox>
    </SSBox>

  );
}

export default MainPage;
