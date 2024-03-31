import { Box } from '@mui/material';
import '../css/css'

let defaultClassName = 'ss-box box d-flex'

let SSBox = ({ alignCenter, justifyCenter, justifySpaceBetween, flexRow, fullWidth, fullHeight, children, className, ...props}) => {
  let SSboxClassName = `${defaultClassName} ${ justifySpaceBetween ? 'justify-content-between' : justifyCenter ?  'justify-content-center':  'justify-content-around'} `;
  SSboxClassName += `${alignCenter? 'align-items-center' : ''} ` 
  SSboxClassName += `${fullWidth? 'box-full-width' : ''} ${ fullHeight ? 'box-full-height' : ''} ` 
  SSboxClassName += `${ flexRow ? 'flex-row' : 'flex-column'} ${className ? className : ''} `
  
  return (
    <Box  className={SSboxClassName} {...props}> 
        {children}
    </Box>
  );
}

export default SSBox;