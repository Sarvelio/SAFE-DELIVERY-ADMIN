import { FC, useState } from "react";

import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { CreateLayout } from "..";

import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { ModalDelete } from "../modal/ModalDelete";

type FormData = {
  nombre: string;
  precioPorLibra: string;
  id?: string;
};
interface props {
  sendData: (
    newData: {},
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
  navigateTo: (url: string) => void;
  errorData: string;
  loadingCUD: boolean;
  data?: FormData;
  editar?: boolean;
  deleteData?: (
    _idDelete?: string,
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
}

export const FormTipoProducto: FC<props> = ({
  errorData,
  sendData,
  loadingCUD,
  navigateTo,
  data = {},
  editar,
  deleteData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: data,
  });

  const [open, setOpen] = useState(false);

  const _navigateTo = () => {
    navigateTo("/admin/tipo-productos");
  };

  const onRegisterForm = ({ nombre, precioPorLibra }: FormData) => {
    console.log({ nombre, precioPorLibra });
    sendData({ nombre, precioPorLibra }, _navigateTo);
  };

  return (
    <CreateLayout title={` ${editar ? "Editar" : "Crear"} tipo de producto`}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <ModalDelete
          eliminar={() => {
            // @ts-ignore
            deleteData(getValues("id"), _navigateTo);
          }}
          open={open}
          setOpen={setOpen}
        />
        <div className="container-web-card ">
          <div className="row">
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {...register("nombre", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </div>
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <FormControl
                fullWidth
                sx={{ m: 1 }}
                variant="filled"
                className="m-0"
              >
                <InputLabel htmlFor="filled-adornment-precioPorLibra">
                  Precio por libra
                </InputLabel>
                <FilledInput
                  type="number"
                  id="filled-adornment-precioPorLibra"
                  {...register("precioPorLibra", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.precioPorLibra}
                  startAdornment={
                    <InputAdornment position="start">Q</InputAdornment>
                  }
                />
                <FormHelperText
                  disabled={!!errors.precioPorLibra}
                  className="Mui-error"
                >
                  {errors.precioPorLibra?.message}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
          {errorData && (
            <div className="alert alert-danger mt-2 mb-0" role="alert">
              {errorData}
            </div>
          )}
          {editar && (
            <button
              className="btn btn-outline-danger mx-0 my-2 px-4"
              type="button"
              disabled={loadingCUD}
              onClick={() => {
                setOpen(true);
              }}
            >
              Eliminar registro
            </button>
          )}

          <div className="d-grid gap-2 d-sm-block text-center">
            <button
              className="btn btn-secondary mx-sm-2 mt-2 px-4 "
              type="button"
              disabled={loadingCUD}
              style={{ minWidth: 150 }}
              onClick={_navigateTo}
            >
              Cancelar
            </button>
            <button
              className="btn btn-warning mx-sm-2 mt-2 px-4 "
              type="submit"
              disabled={loadingCUD}
              style={{ minWidth: 150 }}
            >
              {editar ? "Editar" : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </CreateLayout>
  );
};
