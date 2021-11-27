import React, {useEffect, useState} from 'react';

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
import { useAxios } from '../../hooks/useAxios';

type AppBarProps = {
  updateToken: (token:string|null) => void
  name: string,
  setName: (newName:string) => void
}

type responseProps = {
  nome: string;
}

const AppBar = (props:AppBarProps) => {

  const {
    updateToken,
    name, 
    setName
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
  const {commit, response, error, loading} = useAxios<responseProps>({ method: 'put', path: 'usuarios/logado/nome',  });

  const updateName = (newName:string) => {
    const data = {
      "nome": newName
    }
    commit(data);
    setName(newName);
  };

  const changeName = () => {
    setAnchorEl(null);
    setOpenedNameDialog(true);
  }
  useEffect(() => {
    if(response){
    setName(response?.nome);}
  }, [response])


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