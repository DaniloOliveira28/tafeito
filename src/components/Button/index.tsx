import React from 'react';

import {Button as MuiButton, ButtonProps} from '@mui/material';

const Button = (props: ButtonProps) => {
  return <MuiButton {...props}/>
}

export default Button;