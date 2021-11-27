import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
const TaskInput = () => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
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
            <MenuItem value={'Pessoal'}>Pessoal</MenuItem>
            <MenuItem value={'Trabalho'}>Trabalho</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' flexGrow={1}>
        <TextField
          id="task-text"
          label="O que você precisa fazer?"
          fullWidth
        />
      </Box>
      <Box>
        <IconButton aria-label="add">
          <AddBoxIcon  fontSize="large"  />
        </IconButton>
      </Box>
    </Stack>
  );
}

export default TaskInput;