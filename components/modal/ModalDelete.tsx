import { FC, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export const ModalDelete = ({
  eliminar,
  setOpen,
  open,
}: {
  eliminar: () => void;
  setOpen: any;
  open: boolean;
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Desea eliminar el registro?
        </DialogTitle>
        <DialogActions className="text-center d-flex justify-content-center mb-3">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-secondary mx-3"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              eliminar();
              handleClose();
            }}
            className="btn btn-outline-danger  mx-3"
          >
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
