import React, { useState } from 'react';
import { Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import TextField from '../TextField';
import Button from '../Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { StyledCard, StyledCardContent } from './styles';

interface IValues {
  username: string;
  password: string;
  showPassword: boolean;
};

type LoginFormProps = {
  updateToken: (token:string|null) => void
}

type responseProps = {
  autenticacao: string
}

const LoginForm = (props:LoginFormProps) => {

  const {
    updateToken
  } = props;

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [values, setValues] = useState<IValues>({
    username: '',
    password: '',
    showPassword: false
  });

  const [errorForm, setErrorForm] = useState({
    username: false,
    password: false
  })

  const [isLoading, setIsLoading] = useState(false);
  
  const checkErrorValues = () => {
    setErrorForm({
      username: values.username === '',
      password: values.password === '',
    });
  };

  const handleValues = (key:keyof IValues, value:string|boolean) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const loginUser = () => {
    checkErrorValues();
    if(!(values.username === '') && !(values.password === '')) {
      setIsLoading(true)
      const vars = {
        login: values.username,
        senha: values.password
      }
      axios.post('http://localhost:8080/usuarios/login', vars)
      .then((response) => {
        const data:responseProps = response.data; 
        updateToken(data.autenticacao);
        setIsLoading(false);
      }).catch(err =>{
        console.error(err);
        setIsLoading(false);
        setOpenSnackbar(true);
      }
        );
      
    }
  }

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
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
            helperText="Por favor, insira seu usuário"
            error={errorForm.username}
            sx={{marginY: '8px'}} 
            fullWidth 
            label="Usuário" 
            variant="filled"
            value={values.username}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {handleValues('username', event.target.value)}}
          />
          <TextField 
            helperText="Por favor, insira sua senha"
            error={errorForm.password}
            sx={{marginY: '8px'}} 
            fullWidth 
            label="Senha" 
            variant="filled" 
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {handleValues('password', event.target.value)}}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {handleValues('showPassword', !values.showPassword)}}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}}
          />
          <Button
            disabled={isLoading}
          sx={{marginY: '16px'}}  fullWidth variant={'contained'} 
          onClick={() => { loginUser()}}
          >{
            !isLoading ? 'Entrar' : <CircularProgress size={24}  color={'info'}/>}</Button>
        </StyledCardContent>
      </StyledCard>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Usuário/Senha incorretos"
      />
    </Box>
  )
}

export default LoginForm;