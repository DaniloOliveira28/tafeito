import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TasksListSkeleton from '../TasksListSkeleton';
import TasksList from '../TasksList';
import { useAxios } from '../../hooks/useAxios';
import {Task, Category} from '../../common/types';


type TupleCatTasks = [Category, Task[]]

type TasksListWrapperProps = {
  categories: Category[];
  tasks: Task[];
}
const TasksListWrapper = (props:TasksListWrapperProps) => {

  const {
    categories,
    tasks
  } = props;


  const getTasks = () => {
    if(tasks && categories) {
      const finalTasks:TupleCatTasks[] = categories.map(category => {

        const catTasks = tasks.filter(task => task.id_categoria === category.id);
        return [category, catTasks]
      })
      return finalTasks.map(finalTask => (<TasksList key={`category_${finalTask[0].id}`} category={finalTask[0]} tasks={finalTask[1]} />))
    }
  }
  return (
    <Box>
      <Typography variant={'h3'}>
        Suas Tarefas
      </Typography>
      {getTasks()}
    </Box>
  )
}

export default TasksListWrapper;