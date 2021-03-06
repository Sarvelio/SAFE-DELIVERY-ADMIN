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
import { ITipoProducto } from "../../interfaces";
import { InputNumber } from "../input";
import FormFooter from "./FormFooter";

interface props {
  sendData: (
    newData: {},
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
  navigateTo: (url: string) => void;
  errorData: string;
  loadingCUD: boolean;
  data?: ITipoProducto;
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
  editar = false,
  deleteData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ITipoProducto>({
    defaultValues: data,
  });

  const [open, setOpen] = useState(false);

  const _navigateTo = () => {
    navigateTo("/admin/tipo-productos");
  };

  const onRegisterForm = (formData: ITipoProducto) => {
    sendData(formData, _navigateTo);
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
                  minLength: { value: 2, message: "M??nimo 2 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </div>

            <InputNumber
              name="precioPorLibra"
              title="Precio por libra"
              simbol="Q"
              errors={errors}
              props={{
                ...register("precioPorLibra", {
                  required: "Este campo es requerido",
                }),
              }}
            />
          </div>
          {errorData && (
            <div className="alert alert-danger mt-2 mb-0" role="alert">
              {errorData}
            </div>
          )}
          <FormFooter
            {...{ errorData, editar, loadingCUD, _navigateTo, setOpen }}
          />
        </div>
      </form>
    </CreateLayout>
  );
};
