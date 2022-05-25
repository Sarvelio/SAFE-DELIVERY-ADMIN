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

import { IUsuario } from "../../interfaces";

import bcrypt from "bcryptjs";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DEPARTAMENTOS, MUNICIPIOS, ROLES, validations } from "../../utils";
import { InputSelect, InputTextField, InputNumber } from "../input";
import FormFooter from "./FormFooter";
import { useFirebase } from "../../firebase";
import { ISucursal } from "../../interfaces/sucursal";

interface props {
  sendData: (
    newData: {},
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
  navigateTo: (url: string) => void;
  currentPassword?: string;
  errorData: string;
  loadingCUD: boolean;
  data?: IUsuario;
  editar?: boolean;
  deleteData?: (
    _idDelete?: string,
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
}

export const FormUsuario: FC<props> = ({
  errorData,
  sendData,
  loadingCUD,
  navigateTo,
  data = { departamento: "", municipio: "", rol: "", sucursal: { id: "" } },
  editar = false,
  deleteData,
  currentPassword = "",
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<IUsuario>({
    defaultValues: data,
  });
  const { data: dataSucursales, loading } = useFirebase({
    _collection: "sucursales",
    read: true,
  });
  useEffect(() => {
    console.log("dataSucursales", dataSucursales);
  }, [dataSucursales]);

  const [open, setOpen] = useState(false);

  const _navigateTo = () => {
    navigateTo("/admin/usuarios");
  };

  const onRegisterForm = (formData: IUsuario) => {
    sendData(
      editar
        ? {
            ...formData,
            contrasena: formData.contrasena
              ? bcrypt.hashSync(formData.contrasena)
              : currentPassword,
          }
        : { ...formData, contrasena: bcrypt.hashSync(formData.contrasena) },
      _navigateTo
    );
  };

  return (
    <CreateLayout title={` ${editar ? "Editar" : "Crear"} usuario`}>
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
            <InputTextField
              name="nombre"
              title="Nombre"
              {...{ errors, register }}
            />
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

            <InputTextField
              name="direccion"
              title="Dirección"
              {...{ errors, register }}
            />

            <InputTextField
              name="correo"
              title="Correo"
              type="email"
              props={{
                ...register("correo", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                }),
              }}
              {...{ errors, register }}
            />
            <InputTextField
              name="contrasena"
              title="Contraseña"
              type="password"
              props={{
                ...register(
                  "contrasena",
                  editar
                    ? {
                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                      }
                    : {
                        required: "Este campo es requerido",
                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                      }
                ),
              }}
              {...{ errors, register }}
            />

            <InputSelect
              name="rol"
              title="Rol"
              items={ROLES}
              props={{
                ...register("rol", {
                  required: "Este campo es requerido",
                }),
              }}
              {...{ errors, watch, clearErrors }}
            />
            {Object.keys(dataSucursales).length > 0 &&
              watch("rol") == ROLES[1].id && (
                <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
                  <FormControl
                    fullWidth
                    sx={{ m: 1 }}
                    variant="filled"
                    className="m-0"
                  >
                    <InputLabel>Tipo de producto</InputLabel>
                    <Select
                      {...register("sucursal.id", {
                        required: "Este campo es requerido",
                      })}
                      onFocus={() => {
                        clearErrors("sucursal.id");
                      }}
                      value={watch("sucursal")?.id}
                      onChange={(e) => {
                        setValue(
                          "sucursal",
                          dataSucursales.find(
                            (a) => e.target.value == (a as ISucursal).id
                          ) as unknown as ISucursal
                        );
                      }}
                      error={!!errors.sucursal?.id}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      {dataSucursales.map(({ id, nombre }) => (
                        <MenuItem value={id} key={id}>
                          {nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      disabled={!!errors.sucursal?.id}
                      className="Mui-error"
                    >
                      {errors.sucursal?.id?.message}
                    </FormHelperText>
                  </FormControl>
                </div>
              )}
          </div>

          <FormFooter
            {...{ errorData, editar, loadingCUD, _navigateTo, setOpen }}
          />
        </div>
      </form>
    </CreateLayout>
  );
};
