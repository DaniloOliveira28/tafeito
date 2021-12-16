import React from 'react';

import AttachFile from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
 

const Input = styled('input')({
  display: 'none',
});


const TaskAttachFile = () => {

  return (
    <Tooltip title='Adicionar Anexo'>
      <Box>
      <label htmlFor="icon-button-file">
        <Input accept={"*/*"} id="icon-button-file" type="file" />
        <IconButton edge="end" aria-label="anexos" component="span">
          <AttachFile />
        </IconButton>
      </label>
      </Box>
    </Tooltip>
  )
}

export default TaskAttachFile;