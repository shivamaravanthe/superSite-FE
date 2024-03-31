import '../css/css'
import { DataGrid } from '@mui/x-data-grid';

let defaultClassName = 'ss-data-grid'

let SSGrid = ({rows, columns, className, ...props}) => {
    className = `${defaultClassName} ${className}`
  return (
    <DataGrid  rows={rows} columns={columns} className={className} {...props}/>
  );
}

export default SSGrid;