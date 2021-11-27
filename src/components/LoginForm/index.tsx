import React, { useEffect, useState } from 'react';
import { Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import TextField from '../TextField';
import Button from '../Button';
import Snackbar from '@mui/material/Snackbar';
import { StyledCard, StyledCardContent } from './styles';
import {useAxios} from '../../hooks/useAxios';
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

  
  const checkErrorValues = () => {
    setErrorForm({
      username: values.username === '',
      password: values.password === '',
    });
  };

  const {commit, response, error, loading} = useAxios<responseProps>({method:'POST', path:'usuarios/login'})

  const handleValues = (key:keyof IValues, value:string|boolean) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(response) {
      updateToken(response.autenticacao);
    }
  }, [response]);

  useEffect(() => {
    if(error) {
      console.error(error);
      setOpenSnackbar(true);
    }
  }, [error]);
  const loginUser = () => {
    checkErrorValues();
    if(!(values.username === '') && !(values.password === '')) {
      const vars = {
        login: values.username,
        senha: values.password
      }
      commit(vars);
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
            disabled={loading}
          sx={{marginY: '16px'}}  fullWidth variant={'contained'} 
          onClick={() => { loginUser()}}
          >{
            !loading ? 'Entrar' : <CircularProgress size={24}  color={'info'}/>}</Button>
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