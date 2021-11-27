
import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import AttachFile from '@mui/icons-material/AttachFile';
import Label from '@mui/icons-material/Label';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {Task, Category} from '../../common/types';

type TasksListProps = {
  tasks: Task[];
  category: Category;
}

export default function TasksList(props:TasksListProps) {
  const {
    category,
    tasks
  } = props;

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
    <Typography variant='h4'>
      {category.descricao}
    </Typography>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <Stack direction='row' spacing={1}>
                <Tooltip title='Adicionar tag'>
                <IconButton edge="end" aria-label="etiquetas">
                  <Label />
                </IconButton>
                </Tooltip>
                <Tooltip title='Adicionar Anexo'>
                <IconButton edge="end" aria-label="anexos">
                  <AttachFile />
                </IconButton>
                </Tooltip>
                <Tooltip title='Excluir tarefa'>
                <IconButton edge="end" aria-label="excluir">
                  <Delete />
                </IconButton>
                </Tooltip>
              </Stack>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.concluida}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.descricao} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </>
  );
}