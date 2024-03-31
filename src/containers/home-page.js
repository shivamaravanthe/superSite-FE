import '../css/css'
import SSBox from '../base-containers/ss-box';
import SSGrid from '../base-components/ss-data-grid';
import { useEffect, useState } from 'react';

import config from '../config/config';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  GridActionsCellItem,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import SSForm from '../base-containers/ss-form';
import SSModal from '../base-containers/ss-modal';
import SSTextField from '../base-components/ss-text-field';
import SSButton from '../base-components/ss-button';

let defaultClassName = 'home-page'

function EditToolbar({handleOpen, setBtnTxt, setData, setId}) {
  
  const handleClick = () => {
    setBtnTxt("Save");
    setId(null);
    setData(null);
    handleOpen();
  }

  return (
    <GridToolbarContainer>
      <SSButton color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
        Add record
      </SSButton>
    </GridToolbarContainer>
  );
}

let HomePage = ({ className, children, ...props}) => {
  className = `${defaultClassName} ${className ? className : ''}`

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true); 
    setData(null);
  }

  const handleClose = () => {
    setOpen(false); 
    setData(null);
  }

  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [btnText, setBtnTxt] = useState('Show');


  const list = async() => {
    try {
      const response = await fetch(config.list.url , {
        method: config.list.method,
        headers: config.list.setHeaders(localStorage.getItem('token'))
      });
      const body = await response.json();
      if(response.status === 401) {
        localStorage.removeItem('token');
        alert(body.message)
        window.location.reload();
      } else {
        setRows(body.data);
      }
    } catch (error) {
      console.log('Error in fetching data : ', error.message);
    }
  }

  const show = async(e) => {
    setData(null);
    const formData = new FormData(e.target);
    try {
      const response = await fetch(config.show.url , {
        method: config.show.method,
        body: config.show.setBody(id, formData.get("masterKey")),
        headers: config.show.setHeaders(localStorage.getItem('token'))
      });
      const body = await response.json();
      if (response.status === 401) {
        localStorage.removeItem('token');
        alert(body.message)
        window.location.reload();
      } else if (!response.ok) {
        alert(body.message)
      } else {
        setData(body.data);
        setBtnTxt("Save");
      }
    } catch (error) {
      console.log('Error in fetching data : ', error.message);
    }
  }

  const save = async(e) => {
    const formData = new FormData(e.target);
    try {
      const response = await fetch(config.update.url , {
        method: config.update.method,
        body: config.update.setBody(
          id,
          formData.get("userName"),
          formData.get("password"), 
          formData.get("link"),
          formData.get("description"), 
          formData.get("masterKey")
        ),
        headers: config.update.setHeaders(localStorage.getItem('token'))
      });
      const body = await response.json();
      if (response.status === 401) {
        localStorage.removeItem('token');
        alert(body.message)
        window.location.reload();
      } else if (!response.ok) {
        alert(body.message)
      } else {
        setRows([
          ...rows.filter(row => row.id != id), 
          { "id": id, "description": formData.get("description"), userName: '********', password: '********', link: '********'} 
        ]);
        setData(null);
        handleClose()
      }
    } catch (error) {
      console.log('Error in fetching data : ', error.message);
    }
  }

  const create = async(e) => {
    console.log("cerer", id)
    const formData = new FormData(e.target);
    try {
      const response = await fetch(config.create.url , {
        method: config.create.method,
        body: config.create.setBody(
          formData.get("userName"),
          formData.get("password"), 
          formData.get("link"),
          formData.get("description"), 
          formData.get("masterKey")
        ),
        headers: config.create.setHeaders(localStorage.getItem('token'))
      });
      const body = await response.json();
      if (response.status === 401) {
        localStorage.removeItem('token');
        alert(body.message)
        window.location.reload();
      } else if (!response.ok) {
        alert(body.message)
      } else {
        setRows([ ...rows, body.data]);
        handleClose()
      }
    } catch (error) {
      console.log('Error in fetching data : ', error.message);
    }
  }

  const handleViewClick = (params,id) => () => {
    handleOpen();
    setId(id);
    setBtnTxt('Show');
  };

  const columns = [
    { field: 'description', headerName: 'Description', width: 180, editable: true },
    { field: 'userName', headerName: 'User Name', width: 180, editable: true },
    { field: 'password', headerName: 'Password', width: 180, editable: true },
    { field: 'link', headerName: 'Link', width: 180, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell : ({ id, ...props}) => {
          return (
            <GridActionsCellItem
            icon={<RemoveRedEyeIcon/>}
            label="View"
            onClick={handleViewClick(props,id)}
            color="inherit"
          />
        );
      }
          
    }
  ]

  const [rows, setRows] = useState([]);

  useEffect(() => {list()},[]);
  return (
    <SSBox fullHeight fullWidth className={className}>
        <SSGrid className='password-grid'
          rows={rows}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { handleOpen, setBtnTxt, setData, setId},
          }}
        />
        <SSModal
          open={open}
          onClose={handleClose}
        >
          <SSBox outlined='primary' className='modal-child'>
            <SSForm className='view-list-modal'  handleSubmit={(e)=>   btnText.toLowerCase() === 'show' ? show(e) : id === null ? create(e) : save(e) }>
              <SSTextField value={btnText.toLowerCase()  === 'show' ? '********' : data?.userName || ''} label="User Name" name="userName"/>
              <SSTextField value={btnText.toLowerCase()  === 'show' ? '********' : data?.password || ''} label="Password" name="password"/>
              <SSTextField value={btnText.toLowerCase()  === 'show' ? '********' : data?.link || ''} label="Link" name="link"/>
              <SSTextField value={btnText.toLowerCase()  === 'show' ? '********' : data?.description || ''} label="Description" name="description"/>
              <SSTextField label="Master Key" type="password" required name="masterKey"/>
              <SSButton size="large" type="submit">{btnText}</SSButton>
            </SSForm>
          </SSBox>
        </SSModal>  
    </SSBox>
  );
}

export default HomePage;
