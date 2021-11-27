
import React, {useEffect} from 'react';
import { Box } from "@mui/material";
import TaskInput from "../TasksInput";
import TasksListWrapper from "../TasksListWrapper";
import { useAxios } from '../../hooks/useAxios';
import {Category, Task} from '../../common/types';
import { Skeleton, CircularProgress } from '@mui/material';

import { StyledStack } from './styles';

const MainContainer = () => {

  const {
    commit: commitCategories,
    loading: loadingCategories,
    response: categories,
    error: errorCategories,
  } = useAxios<Category[]>({
    method: 'GET',
    path: 'categorias'
  });

  const {
    commit: commitTasks,
    loading: loadingTasks,
    response: tasks,
    error: errorTasks,
  } = useAxios<Task[]>({
    method: 'GET',
    path: 'tarefas'
  });

  useEffect(() => {
    commitCategories()
    commitTasks()
  }, [])

  const updateTasks = () => {
    commitTasks()
  }
  return (
    <Box display='flex' justifyContent='center'>

      <StyledStack spacing={2} mt={2}>
        {categories ? <TaskInput categories={categories} updateTasks={updateTasks}/> : <Skeleton />}
        {categories && tasks ? <TasksListWrapper updateTasks={updateTasks} categories={categories} tasks={tasks}/> : <Box width={'100%'} textAlign='center'><CircularProgress /></Box>}
      </StyledStack>
    </Box>
  )
};

export default MainContainer;