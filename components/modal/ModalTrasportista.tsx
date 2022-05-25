import { FC, useState, useEffect, useContext } from "react";
import { UiContext } from "../../context/ui";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, Typography } from "@mui/material";
import { InputSelect } from "../input";
import { IUsuario } from "../../interfaces/user";
import { useForm } from "react-hook-form";
import { GridSelectionModel } from "@mui/x-data-grid";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase/configFirebase";
import { IPaquete } from "../../interfaces/paquete";
import { PAQUETES } from "../../utils/paquetes";

interface IProps {
  transportista: string;
}
export const ModalTrasportista = ({
  selectionModel,
  setOpen,
  open,
  refresh,
  navigateTo,
}: {
  selectionModel: GridSelectionModel;
  open: boolean;
  setOpen: any;
  refresh: any;
  navigateTo: (url: string) => void;
}) => {
  const { yesLoading, noLoading, isLoading } = useContext(UiContext);

  const [transportista, setTransportista] = useState<IUsuario[]>();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<IProps>({
    defaultValues: {
      transportista: "",
    },
  });

  useEffect(() => {
    const getTrasportistas = async () => {
      const _docs = await getDocs(
        query(collection(db, "usuarios"), where("rol", "==", "transportista"))
      );
      const response: any = [];
      _docs.forEach((_doc) => {
        response.push({ id: _doc.id, ..._doc.data() });
      });
      setTransportista(response);
    };
    getTrasportistas();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const updateDataByID = async (newData: { id: "" }) => {
    const _doc = await updateDoc(doc(db, "paquetes", newData.id), newData);
  };

  const onRegisterForm = async (formData: IProps) => {
    yesLoading();
    try {
      const _transportista = transportista!.find(
        (data) => data.id == formData.transportista
      );
      const _docs = await getDocs(
        query(
          collection(db, "paquetes"),
          where("estado", "==", PAQUETES[0].id),
          where("id", "in", selectionModel)
        )
      );
      const response: any = [];
      _docs.forEach((_doc) => {
        response.push({
          id: _doc.id,
          ..._doc.data(),
          estado: PAQUETES[1].id,
          transportista: _transportista,
          fechaEnRuta: new Date(),
        });
      });

      const _promise = [];
      for (let i = 0; i < response.length; i++) {
        _promise.push(updateDataByID(response[i]));
      }
      Promise.all(_promise)
        .then((values) => {
          refresh();
          setOpen(false);
          navigateTo("/paquetes/estado/en-ruta");
        })
        .catch((error) => {
          console.log("--error--", error);
          setOpen(false);
        });
    } catch (error) {
      noLoading();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Seleccione el transportista
          </DialogTitle>

          <InputSelect
            fullScreen
            name="transportista"
            title="transportista" // @ts-ignore
            items={transportista}
            props={{
              ...register("transportista", {
                required: "Este campo es requerido",
              }),
            }}
            {...{ errors, watch, clearErrors }}
          />
          <DialogContent dividers>
            <Typography gutterBottom>
              Se asignara {selectionModel.length}
              {selectionModel.length > 1 ? " paquetes " : " paquete "}
              al transportista seleccionado.
            </Typography>
          </DialogContent>
          {isLoading && (
            <div className="alert alert-info text-center" role="alert">
              Asignando, Espere por favor
            </div>
          )}
          <DialogActions className="text-center d-flex justify-content-center mb-3">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary mx-3"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onRegisterForm)}
              className="btn btn-outline-danger  mx-3"
              disabled={isLoading}
            >
              Asiganar
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};
