import '../css/css'
import SSBox from '../base-containers/ss-box';

let defaultClassName = 'side-bar'

let SideBar = ({ className, children, ...props}) => {

  className = `${defaultClassName} ${className ? className : ''}`
  return (
    <SSBox fullHeight maxWidth='sm' className={className}> 
        {children}
    </SSBox>
  );
}

export default SideBar;
