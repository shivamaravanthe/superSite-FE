import { Modal } from '@mui/material';
import '../css/css'

let defaultClassName = 'ss-modal d-flex justify-content-around rounded-1'

let SSModal = ({ children, className, ...props}) => {
  className = ` ${defaultClassName} ${className ? className : ''}`
  return (
    <Modal className={className} {...props}> 
        {children}  
    </Modal>
  );
}

export default SSModal;