import { TextField } from '@mui/material';
import '../css/css'
import { useEffect, useRef } from 'react';

let defaultClassName = 'ss-text-field'

let SSTextField = ({ value, defaultValue, children, className, ...props}) => {
  className = `${defaultClassName} ${className}`
  const inputRef = useRef()
  useEffect(()=>{
    if (value) {
      inputRef.current.value = value;
    } else if (defaultValue) {
      inputRef.current.value = defaultValue;
    } else {
      if( inputRef.current )
      inputRef.current.value = '';
    }
  },[value])
    
  return (
    <TextField inputRef={inputRef} className={className} {...props}/>
  );
}

export default SSTextField;