import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateShopModal({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Tienda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellene el formulario para crear una tienda.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" form="subscription-form">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
