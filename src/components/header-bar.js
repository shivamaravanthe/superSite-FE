import '../css/css'
import SSBox from '../base-containers/ss-box';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SSButton from '../base-components/ss-button';

let defaultClassName = 'header-bar'

let HeaderBarLeftSection = ({ className, children, ...props}) => {
  className = `header-bar-left p-2 ${className ? className : ''}`
  return (
    <SSBox justifyCenter alignCenter flexRow fullHeight className={className}> 
        left
    </SSBox>
  );
}


let HeaderBarRightSection = ({ className, children, ...props}) => {
    className = `header-bar-right p-2 ${className ? className : ''}`

    const handleLogout = (e) => {
      localStorage.removeItem('token');
      window.location.reload()
    }

    return (
      <SSBox justifyCenter alignCenter fullHeight flexRow className={className}> 
        <SSButton variant='outlined' onClick={handleLogout}>
          <LogoutOutlinedIcon fontSize='large'/>
        </SSButton> 
      </SSBox>
    );
}


let HeaderBar = ({ className, children, ...props}) => {
  className = `${defaultClassName} ${className ? className : ''}`
  console.log(className)
  return (
    <SSBox justifySpaceBetween fullWidth flexRow className={className}> 
      <HeaderBarLeftSection/> 
      <HeaderBarRightSection/> 
    </SSBox>
  );
}

export default HeaderBar;
