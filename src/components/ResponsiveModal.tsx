import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  title: string;
  triggerButtonText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ResponsiveModal({
  title,
  triggerButtonText,
  open,
  setOpen,
  children,
}: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle component="h4" variant="h5">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button type="submit" form="subscription-form">
          {triggerButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
