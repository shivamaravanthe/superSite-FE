import '../css/css'
import { Button } from '@mui/material';

let defaultClassName = 'ss-button'
let defaultVariant = 'contained';
let SSButton = ({ children, className, variant, ...props}) => {
    className = `${defaultClassName} ${className}`

  return (
    <Button variant={variant || defaultVariant} className={className} {...props}>
      {children}
    </Button>
  );
}

export default SSButton;