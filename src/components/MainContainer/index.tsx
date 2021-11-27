
import React from 'react';
import { Stack } from "@mui/material";
import TaskInput from "../TasksInput";
import TasksList from "../TasksList";

const MainContainer = () => {

  return (
      <Stack spacing={2} mt={2}>
        <TaskInput />
        <TasksList />
      </Stack>
  )
};

export default MainContainer;