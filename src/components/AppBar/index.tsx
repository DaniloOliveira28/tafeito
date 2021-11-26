import React, {useState} from 'react';

import { AppBar as MuiAppBar, 
        Toolbar, 
        Typography,
        IconButton,
        MenuItem,
        Menu } from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';

type AppBarProps = {
  updateToken: (token:string|null) => void
}

const AppBar = (props:AppBarProps) => {

  const {
    updateToken
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


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

  return (
    <MuiAppBar position="static">
      <Toolbar>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tafeito
        </Typography>
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
              <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>
          </div>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;