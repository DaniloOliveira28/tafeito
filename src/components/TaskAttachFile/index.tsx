import React from 'react';

import AttachFile from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import { useAxios } from '../../hooks/useAxios';


const Input = styled('input')({
  display: 'none',
});

type TaskAttachFileProps = {
  taskId: number;
  updateTasks: () => void;
}

const TaskAttachFile = (props: TaskAttachFileProps) => {
  const {
    taskId
  } = props;
  const {
    commit,
    response,
    loading
  } = useAxios({
    method: 'POST',
    path: `tarefas/${taskId}/anexos`
  });

  const fileUpload = (file:File) => {
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('arquivo',file)
    const customHeaders = {
      'content-type': 'multipart/form-data'
    }

    commit(formData,
      () => {
        props.updateTasks()
      }, 
      `tarefas/${taskId}/anexos`, 
      undefined,
      customHeaders)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      fileUpload(e.target.files?.[0])
    }
  }

  return (
    <Tooltip title={`Adicionar Anexo ${taskId}`}>
      <Box>
      <label htmlFor={`icon-button-file_${taskId}`}>
        <Input id={`icon-button-file_${taskId}`} accept={"*/*"} type="file" onChange={onChange}/>
        <IconButton edge="end" aria-label="anexos" component="span">
          <AttachFile />
        </IconButton>
      </label>
      </Box>
    </Tooltip>
  )
}

export default TaskAttachFile;