import React, {useEffect} from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAxios } from '../../hooks/useAxios';

import {Anexo} from '../../common/types';

type AttachFileProps = {
  anexo: Anexo;
  taskId: number;
}

type ResponseGetAttachedFile = Blob;

const AttachFile = (props:AttachFileProps) => {
  const { taskId, anexo } = props;

  const {
    commit: commitDownloadAnexo,
    response,
    loading
  } = useAxios<ResponseGetAttachedFile>({
    method: 'GET',
    path: `tarefas/${taskId}/anexos/${anexo.id}`
  });

  useEffect(() => {
    if(response && !loading) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', anexo.nome);
      document.body.appendChild(link);
      link.click();
    }
  }, [response, loading]);

  const downloadAnexo = () => {
    commitDownloadAnexo(
      undefined, 
      undefined,
      undefined,
      'blob'
    );
  };
  
  return (
    <ListItemButton sx={{ pl: 4 }} onClick={() => {downloadAnexo()}}>
      <ListItemText primary={anexo.nome} />
    </ListItemButton>
  )
}

export default AttachFile;