import { FormControl } from '@mui/material';
import '../css/css'
import SSBox from './ss-box';

let defaultClassName = 'ss-form'

let SSForm = ({ boxProps, handleSubmit, children, className, ...props}) => {
    className = ` ${defaultClassName} ${className ? className : ''} ${boxProps?.className ? boxProps?.className : ''}`
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    }

    return (
        <form onSubmit={handleFormSubmit} className={className}>
            <SSBox {...boxProps} sx={{height: '100%', width: '100%'}}>
                {
                    children.map((child, index) => 
                        <FormControl key={`ss-form-child-${index+1}`}>
                            {child}
                        </FormControl>
                    )
                }
            </SSBox>
        </form>
    );
}

export default SSForm;