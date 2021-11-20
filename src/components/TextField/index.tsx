import React from 'react';

import {TextField as MuiTextField, TextFieldProps} from '@mui/material';

const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props}/>
}

export default TextField;