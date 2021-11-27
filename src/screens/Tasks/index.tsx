import React from 'react';
import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';

type TasksProps = {
  updateToken: (token:string|null) => void
}
const Tasks = (props:TasksProps) => {
  const {
    updateToken
  } = props;
  return (
    <>
      <AppBar updateToken={updateToken}/>
      <MainContainer />
    </>
  )
}
export default Tasks;