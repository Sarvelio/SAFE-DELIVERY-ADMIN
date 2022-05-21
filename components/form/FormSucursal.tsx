import { FC, useState, useEffect } from "react";

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

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DEPARTAMENTOS, MUNICIPIOS } from "../../utils";
import { InputSelect, InputTextField, InputNumber } from "../input";
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
  data?: ISucursal;
  editar?: boolean;
  deleteData?: (
    _idDelete?: string,
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
}

export const FormSucursal: FC<props> = ({
  errorData,
  sendData,
  loadingCUD,
  navigateTo,
  data = { departamento: "", municipio: "" },
  editar = false,
  deleteData,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
    watch,
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
            <InputSelect
              name="departamento"
              title="Departamento"
              items={DEPARTAMENTOS}
              props={{
                ...register("departamento", {
                  required: "Este campo es requerido",
                }),
                onChange: (e: any) => {
                  setValue("municipio", "");
                  setValue("departamento", e.target.value);
                },
              }}
              {...{ errors, watch, clearErrors }}
            />
            <InputSelect
              name="municipio"
              title="Municipio"
              items={MUNICIPIOS.filter(
                ({ departamento }) => departamento == watch("departamento")
              )}
              props={{
                ...register("municipio", {
                  required: "Este campo es requerido",
                }),
              }}
              {...{ errors, watch, clearErrors }}
            />
            {[
              { name: "direccion", label: "Dirección" },
              { name: "nombre", label: "Nombre" },
            ].map(({ name, label }) => {
              return (
                <InputTextField
                  name={name}
                  title={label}
                  key={name}
                  {...{ errors, register }}
                />
              );
            })}
            <InputNumber
              name="telefono"
              title="Teléfono"
              simbol="+502"
              errors={errors}
              props={{
                ...register("telefono", {
                  required: "Este campo es requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  maxLength: { value: 8, message: "Máximo 8 caracteres" },
                }),
              }}
            />
          </div>

          <FormFooter
            {...{ errorData, editar, loadingCUD, _navigateTo, setOpen }}
          />
        </div>
      </form>
    </CreateLayout>
  );
};
