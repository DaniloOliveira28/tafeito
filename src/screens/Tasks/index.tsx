import React from 'react';
import AppBar from '../../components/AppBar'

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
    </>
  )
}
export default Tasks;