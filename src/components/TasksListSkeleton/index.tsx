import React, { useState } from 'react';

import { Skeleton } from "@mui/material";

const TasksListSkeleton = () => {

  return (
    <>
    <Skeleton variant="text" height={40}/>
    <Skeleton variant="rectangular" width={'100%'} height={120} />
    <Skeleton variant="text" height={40}/>
    <Skeleton variant="rectangular" width={'100%'} height={120} />
    </>
  )
}

export default TasksListSkeleton;