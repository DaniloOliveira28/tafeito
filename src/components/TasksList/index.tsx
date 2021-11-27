
import React from 'react';

import {Task, Category} from '../../common/types';

type TasksListProps = {
  tasks: Task[];
  category: Category;
}
const TasksList = (props:TasksListProps) => {
  const {
    category,
    tasks
  } = props;

  return (
    <>
    <div>{category.descricao}</div>
    {tasks.map(task => {
      return task.descricao
    })}
    </>
  )
}

export default TasksList;