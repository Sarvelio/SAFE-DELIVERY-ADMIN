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

import { ISucursal } from "../../interfaces";

interface props {
  sendData: (
    newData: {},
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
  navigateTo: (url: string) => void;
  errorData: string;
  loadingCUD: boolean;
  data?: ISucursal;
  editar?: boolean;
  deleteData?: (
    _idDelete?: string,
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
}

export const FormSucursales: FC<props> = ({
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
  } = useForm<ISucursal>({
    defaultValues: data,
  });

  const [open, setOpen] = useState(false);

  const _navigateTo = () => {
    navigateTo("/admin/sucursales");
  };

  const onRegisterForm = (formData: ISucursal) => {
    sendData(formData, _navigateTo);
  };

  const InputTextField = ({
    clave,
    label,
  }: {
    clave: string;
    label: string;
  }) => {
    return (
      <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
        <TextField
          label={label}
          variant="filled"
          fullWidth
          // @ts-ignore
          {...register(clave, {
            required: "Este campo es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          // @ts-ignore
          error={!!errors[clave]}
          // @ts-ignore
          helperText={errors[clave]?.message}
        />
      </div>
    );
  };

  return (
    <CreateLayout title={` ${editar ? "Editar" : "Crear"} sucursal`}>
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
            {[
              { name: "nombre", label: "Nombre" },
              { name: "departamento", label: "Departamento" },
              { name: "municipio", label: "Municipio" },
              { name: "direccion", label: "Dirección" },
            ].map(({ name, label }) => {
              return <InputTextField clave={name} label={label} key={name} />;
            })}
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <FormControl
                fullWidth
                sx={{ m: 1 }}
                variant="filled"
                className="m-0"
              >
                <InputLabel htmlFor="filled-adornment-telefono">
                  Teléfono
                </InputLabel>
                <FilledInput
                  type="number"
                  id="filled-adornment-telefono"
                  {...register("telefono", {
                    required: "Este campo es requerido",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    maxLength: { value: 8, message: "Máximo 8 caracteres" },
                  })}
                  error={!!errors.telefono}
                  startAdornment={
                    <InputAdornment position="start">+502</InputAdornment>
                  }
                />
                <FormHelperText
                  disabled={!!errors.telefono}
                  className="Mui-error"
                >
                  {errors.telefono?.message}
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
