import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DialogNameProps = {
  open: boolean;
  setOpen: (status:boolean) => void;
  currentName: string;
  updateName: (name:string) => void;
}
export default function DialogName(props:DialogNameProps) {

  const {
    open,
    setOpen,
    currentName,
    updateName,
  } = props;

  const [newName, setNewName] = useState('');
  const handleSave = () => {
    setOpen(false);
    updateName(newName)
  };

  const handleClose = () => {
    setOpen(false);
    setNewName('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Alteração de Nome</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o se novo nome
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Seu novo nome"
            type="text"
            fullWidth
            variant="standard"
            value={newName}
            onChange={(event) => {setNewName(event.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={newName === '' || newName===currentName}>Alterar</Button>
        </DialogActions>
      </Dialog>
  );
}