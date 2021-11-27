import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TasksListSkeleton from '../TasksListSkeleton';
import TasksList from '../TasksList';
import { useAxios } from '../../hooks/useAxios';
import {Task, Category} from '../../common/types';


type TupleCatTasks = [Category, Task[]]
const TasksListWrapper = () => {

  const [loading, setLoading] = useState(true);

  const {
    commit: commitTasks,
    loading: loadingTasks,
    response: tasks,
    error: errorTasks,
  } = useAxios<Task[]>({
    method: 'GET',
    path: 'tarefas'
  });

  const {
    commit: commitCategories,
    loading: loadingCategories,
    response: categories,
    error: errorCategories,
  } = useAxios<Category[]>({
    method: 'GET',
    path: 'categorias'
  });

  const loadData = async () => {
    commitCategories();
    commitTasks();
  }

  useEffect(() => {
    loadData();
  }, [])

  const getTasks = () => {
    if(tasks && categories) {
      const finalTasks:TupleCatTasks[] = categories.map(category => {

        const catTasks = tasks.filter(task => task.id_categoria === category.id);
        return [category, catTasks]
      })
      return finalTasks.map(finalTask => (<TasksList category={finalTask[0]} tasks={finalTask[1]} />))

    }
  }
  return (
    <Box>
      <Typography variant={'h3'}>
        Suas Tarefas
      </Typography>
      {loadingTasks || loadingCategories ? <TasksListSkeleton /> : getTasks()}
    </Box>
  )
}

export default TasksListWrapper;