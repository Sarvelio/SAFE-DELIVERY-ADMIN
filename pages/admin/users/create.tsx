import { useState } from "react";
import { useRouter } from "next/router";

import NextLink from "next/link";

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import bcrypt from "bcryptjs";
import { validations } from "../../../utils";
import { useFirebase } from "../../../firebase";
import { CreateLayout } from "../../../components";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const CreatePage = () => {
  const router = useRouter();

  const {
    loading,
    loadingCUD,
    data,
    setRefresh,
    sendData,
    deleteData,
    navigateTo,
    errorData,
  } = useFirebase({
    _collection: "usuarios",
    unique: ["email", "nombre"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onRegisterForm = ({ name, email, password }: FormData) => {
    sendData(
      { nombre: name, email, password: bcrypt.hashSync(password) },
      () => {
        navigateTo("/admin/users");
      }
    );
  };

  return (
    <CreateLayout title={"Crear Usuario"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <div className="container-web-card ">
          <div className="row">
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </div>
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </div>
          </div>
          {errorData && (
            <div className="alert alert-danger mt-2 mb-0" role="alert">
              {errorData}
            </div>
          )}

          <div className="d-grid gap-2 d-sm-block text-center">
            <button
              className="btn btn-warning mx-sm-2 my-3 px-4"
              type="submit"
              disabled={loadingCUD}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </CreateLayout>
  );
};

export default CreatePage;
