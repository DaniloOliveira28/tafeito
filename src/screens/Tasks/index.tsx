import React, {useState, useEffect} from 'react';
import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';
import { useAxios } from '../../hooks/useAxios';

type TasksProps = {
  updateToken: (token:string|null) => void
};

type responseProps = {
  nome: string
};


const Tasks = (props:TasksProps) => {
  const {
    updateToken
  } = props;

  const [name, setName] = useState<string|null>(null);

  const {commit, response, error, loading} = useAxios<responseProps>({ method: 'get', path: 'usuarios/logado' })

  useEffect(() => {
    commit()
  },[]);
  
  useEffect(() => {

    if(response) {
      setName(response.nome);
    };
  
  }, [response]);

  if(loading) {
    return <div>loading</div>
  }
  return (
    <>
      {name ? <AppBar updateToken={updateToken} name={name} setName={(newName) => setName(newName)}/> : 'nao'}
      <MainContainer />
    </>
  )
}
export default Tasks;