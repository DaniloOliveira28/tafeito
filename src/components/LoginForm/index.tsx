import React, { useState } from 'react';
import { Box, Typography, InputAdornment, IconButton } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import TextField from '../TextField';
import Button from '../Button';

import { StyledCard, StyledCardContent } from './styles';

const LoginForm = () => {

  const [values, setValues] = useState({
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <Box display='flex' justifyContent={'center'} alignItems={'center'} height="100vh" >
      <StyledCard>
        <StyledCardContent>
          <Typography variant='h1'>
            Tafeito
          </Typography>
          <Typography variant='body1'>
            Transforme suas tarefas em ações
          </Typography>
        </StyledCardContent>
        <StyledCardContent>
          <TextField
            sx={{marginY: '8px'}} 
            fullWidth 
            label="Email" 
            variant="filled"
          />
          <TextField 
            sx={{marginY: '8px'}} 
            fullWidth 
            label="Senha" 
            variant="filled" 
            type={values.showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}}
          />
          <Button sx={{marginY: '16px'}}  fullWidth variant={'contained'} >Entrar</Button>
        </StyledCardContent>
      </StyledCard>
    </Box>
  )
}

export default LoginForm;