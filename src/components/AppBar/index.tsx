import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { AppBar as MuiAppBar, 
        Toolbar, 
        Typography,
        IconButton,
        MenuItem,
        Menu,
        Skeleton,
        Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

import DialogName from '../DialogName';
import { TokenProps } from '../../common/types';
import { SignalCellularNull } from '@mui/icons-material';


type AppBarProps = {
  updateToken: (token:string|null) => void
}

type responseProps = {
  nome: string;
}

const AppBar = (props:AppBarProps) => {

  const {
    updateToken
  } = props;

  const item = window.localStorage.getItem('token');
  const tokenObj: TokenProps = JSON.parse(item!);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState<null| string>(null);
  const [openedNameDialog, setOpenedNameDialog] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    updateToken(null);
  }

  const loadName = () => {
    axios.get('http://localhost:8080/usuarios/logado', { headers: {"Authorization" : `Bearer ${tokenObj!.token}`} })
      .then((response) => {
        const data:responseProps = response.data; 
        setName(data.nome);
      }).catch(err =>{
        console.error(err);
      }
    );
  }

  const updateName = (newName:string) => {
    axios.put('http://localhost:8080/usuarios/logado/nome', 
    {
      "nome": newName
    },{ 
        headers: {"Authorization" : `Bearer ${tokenObj!.token}`}
     })
      .then(() => {
        setName(newName);
      }).catch(err =>{
        console.error(err);
      }
    );
  };

  const changeName = () => {
    setAnchorEl(null);

    setOpenedNameDialog(true);
  }

  useEffect(() => {
    loadName()
  }, [])


  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Typography variant="h6" component="div" sx={{marginRight: '16px'}}>
            Tafeito
          </Typography>
          <Typography variant="h6" component="div">
            {name ? `Bem-vindx ${name}` : <Skeleton />}
          </Typography>
        </Box>
        <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={changeName}>Alterar Nome</MenuItem>
              <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>
          </div>
      </Toolbar>
      {name ? <DialogName 
        open={openedNameDialog} 
        setOpen={(status) => setOpenedNameDialog(status)} 
        currentName={name} 
        updateName={(newName:string) => {updateName(newName)}}
      /> : null}
    </MuiAppBar>
  )
}

export default AppBar;