import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip'
import { useAxios } from '../../hooks/useAxios';
import {Category} from '../../common/types';
import Snackbar from '@mui/material/Snackbar';

type TaskInputProps = {
  categories: Category[];
  updateTasks: () => void;
}

type ResponsePostTask = {
  id:number
}
const TaskInput = (props:TaskInputProps) => {

  const {
    categories,
    updateTasks
  } = props;
  const [category, setCategory] = React.useState<string>('');
  const [task, setTask] = React.useState('');
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
  const [openSnackbarError, setOpenSnackbarError] = useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const {
    commit: commitTask,
    loading: loadingTask,
    response: taskId,
    error: errorTask,
  } = useAxios<ResponsePostTask>({
    method: 'POST',
    path: 'tarefas'
  });

  const notifyUser = () => {
    if(errorTask) {
      return setOpenSnackbarError(true)
    }
    updateTasks()
    return setOpenSnackbarSuccess(true);
  }
  const saveTask = () => {
    commitTask({
      "descricao": task,
      "id_categoria": category
    }, notifyUser)
  };


  return (
    <>
    <Stack direction={'row'} spacing={2} alignItems="center" justifyContent='center'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Categoria</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={category}
            label="Categoria"
            onChange={handleChange}
          >
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.descricao}</MenuItem>
            ))}           
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' flexGrow={1}>
        <TextField
          id="task-text"
          label="O que você precisa fazer?"
          fullWidth
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
      </Box>
      <Box>
        <Tooltip title="Adicionar tarefa">
          <span>
          <IconButton aria-label="add" onClick={saveTask} disabled={category === '' || task ===''} >
            <AddBoxIcon  fontSize="large" color={!(category === '' || task ==='') ? 'primary' : undefined} />
          </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Stack>
    <Snackbar
      open={openSnackbarSuccess}
      autoHideDuration={6000}
      onClose={(
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbarSuccess(false);
      }}
      message="Tarefa criada com sucesso!"
    />
    <Snackbar
      open={openSnackbarError}
      autoHideDuration={6000}
      onClose={(
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbarError(false);
      }}
      message="Ocorreu algum erro"
    />
    </>
  );
}

export default TaskInput;