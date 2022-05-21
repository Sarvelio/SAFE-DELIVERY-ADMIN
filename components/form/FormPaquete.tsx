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

import { IPaquete } from "../../interfaces";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DEPARTAMENTOS, MUNICIPIOS } from "../../utils";
import { InputSelect, InputTextField, InputNumber } from "../input";
import FormFooter from "./FormFooter";
import { ITipoProducto } from "../../interfaces/tipoProducto";
import { PAQUETES } from "../../utils/paquetes";

interface props {
  sendData: (
    newData: {},
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
  navigateTo: (url: string) => void;
  errorData: string;
  loadingCUD: boolean;
  tipoProducto: ITipoProducto[];
  data?: IPaquete;
  editar?: boolean;
  onlyRead?: boolean;
  deleteData?: (
    _idDelete?: string,
    callBack?: (() => void) | undefined,
    callBackError?: (() => void) | undefined
  ) => void;
}

export const FormPaquete: FC<props> = ({
  errorData,
  sendData,
  loadingCUD,
  tipoProducto,
  navigateTo,
  data = {
    emisor: { departamento: "", municipio: "" },
    receptor: { departamento: "", municipio: "" },
    tipoProducto: { id: "" },
    totalPagar: 0,
    estado: PAQUETES[0].id,
  },
  editar = false,
  onlyRead = false,
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
  } = useForm<IPaquete>({
    defaultValues: data,
  });

  const [open, setOpen] = useState(false);

  const _navigateTo = () => {
    navigateTo("/paquetes/estado/en-oficina");
  };

  const onRegisterForm = (formData: IPaquete) => {
    sendData(formData, _navigateTo);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "peso" || name === "tipoProducto") {
        if (value.peso?.trim() && value?.tipoProducto?.precioPorLibra) {
          const _pesoLibra = Number(value.peso?.trim());
          const _precioPorLibra = Number(value.tipoProducto?.precioPorLibra);
          const entero = Math.trunc(_pesoLibra);
          let newTotal: number = 0;
          switch (true) {
            case _pesoLibra == entero:
              newTotal = entero * _precioPorLibra;
              break;
            case _pesoLibra < entero + 0.25:
              newTotal = (entero + 0.25) * _precioPorLibra;
              break;
            case _pesoLibra < entero + 0.5:
              newTotal = (entero + 0.5) * _precioPorLibra;
              break;
            case _pesoLibra < entero + 0.75:
              newTotal = (entero + 0.75) * _precioPorLibra;
              break;
            default:
              newTotal = (entero + 1) * _precioPorLibra;
              break;
          }
          setValue("totalPagar", Math.round(newTotal));
        } else {
          setValue("totalPagar", 0);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const Cliente = (clave = "") => {
    return (
      <>
        {[
          { name: `nombre`, label: "Nombre" },
          { name: `direccion`, label: "Dirección" },
        ].map(({ name, label }) => {
          return (
            <InputTextField
              name={`${clave}.${name}`}
              title={label}
              key={`${clave}.${name}`}
              // @ts-ignore
              error={!!errors[clave]?.[name]}
              // @ts-ignore
              helperText={errors[clave]?.[name]?.message}
              {...{ errors, register }}
            />
          );
        })}
        <InputSelect
          name={`${clave}.departamento`}
          title="Departamento"
          items={DEPARTAMENTOS}
          props={{
            // @ts-ignore
            ...register(`${clave}.departamento`, {
              required: "Este campo es requerido",
            }),
            onChange: (e: any) => {
              // @ts-ignore
              setValue(`${clave}.municipio`, "");
              // @ts-ignore
              setValue(`${clave}.departamento`, e.target.value);
            },
          }}
          // @ts-ignore
          error={!!errors[clave]?.["departamento"]}
          // @ts-ignore
          helperText={errors[clave]?.["departamento"]?.message}
          {...{ errors, watch, clearErrors }}
        />
        <InputSelect
          name={`${clave}.municipio`}
          title="Municipio"
          items={MUNICIPIOS.filter(
            // @ts-ignore
            ({ departamento }) => departamento == watch(`${clave}.departamento`)
          )}
          props={{
            // @ts-ignore
            ...register(`${clave}.municipio`, {
              required: "Este campo es requerido",
            }),
          }}
          // @ts-ignore
          error={!!errors[clave]?.["municipio"]}
          // @ts-ignore
          helperText={errors[clave]?.["municipio"]?.message}
          {...{ errors, watch, clearErrors }}
        />
        <InputNumber
          name={`${clave}.telefono`}
          title="Teléfono"
          simbol="+502"
          errors={errors}
          props={{
            // @ts-ignore
            ...register(`${clave}.telefono`, {
              required: "Este campo es requerido",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              maxLength: { value: 8, message: "Máximo 8 caracteres" },
            }),
          }}
          // @ts-ignore
          error={!!errors[clave]?.["telefono"]}
          // @ts-ignore
          helperText={errors[clave]?.["telefono"]?.message}
        />
      </>
    );
  };

  return (
    <CreateLayout
      title={` ${editar ? "Editar" : "Crear"} paquete`}
      onlyRead={onlyRead}
    >
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
            <InputNumber
              name="peso"
              title="Peso en libra"
              errors={errors}
              props={{
                ...register("peso", {
                  required: "Este campo es requerido",
                }),
              }}
            />

            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <FormControl
                fullWidth
                sx={{ m: 1 }}
                variant="filled"
                className="m-0"
              >
                <InputLabel>Tipo de producto</InputLabel>
                <Select
                  {...register("tipoProducto.id", {
                    required: "Este campo es requerido",
                  })}
                  onFocus={() => {
                    clearErrors("tipoProducto.id");
                  }}
                  value={watch("tipoProducto")?.id}
                  onChange={(e) => {
                    setValue(
                      "tipoProducto",
                      tipoProducto.find(
                        (a) => e.target.value == a.id
                      ) as ITipoProducto
                    );
                  }}
                  error={!!errors.tipoProducto?.id}
                >
                  {!editar && (
                    <MenuItem value="">
                      <em>Ninguno</em>
                    </MenuItem>
                  )}
                  {tipoProducto.map(({ id, nombre }) => (
                    <MenuItem value={id} key={id}>
                      {nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  disabled={!!errors.tipoProducto?.id}
                  className="Mui-error"
                >
                  {errors.tipoProducto?.id?.message}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="col-12 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <h5>
                <span className="fw-bold">Total a pagar: Q</span>
                {watch("totalPagar")}
              </h5>
            </div>
            <h4 className="mt-3">Emisor</h4>
            <hr className="mb-1" />
            {Cliente("emisor")}
            <h4 className="mt-3">Receptor</h4>
            <hr className="mb-1" />
            {Cliente("receptor")}
          </div>

          <FormFooter
            {...{
              errorData,
              editar,
              loadingCUD,
              _navigateTo,
              setOpen,
              onlyRead,
            }}
          />
        </div>
      </form>
    </CreateLayout>
  );
};
