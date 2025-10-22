import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  title: string;
  description: string;
  triggerButtonText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ResponsiveModal({
  title,
  description,
  triggerButtonText,
  open,
  setOpen,
  children,
}: Props) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button type="submit" form="subscription-form">
            {triggerButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
