import * as React from "react";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateShop({ open, setOpen }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);

    setOpen(false);
  };

  return (
    <ResponsiveModal
      title="Crear tienda"
      description="Rellene el formulario para crear una tienda"
      triggerButtonText="Crear"
      open={open}
      setOpen={setOpen}
    >
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
    </ResponsiveModal>
  );
}
