
import React from 'react';
import { Box } from "@mui/material";
import TaskInput from "../TasksInput";
import TasksListWrapper from "../TasksListWrapper";

import { StyledStack } from './styles';
const MainContainer = () => {

  return (
    <Box display='flex' justifyContent='center'>

      <StyledStack spacing={2} mt={2}>
        <TaskInput />
        <TasksListWrapper />
      </StyledStack>
    </Box>
  )
};

export default MainContainer;