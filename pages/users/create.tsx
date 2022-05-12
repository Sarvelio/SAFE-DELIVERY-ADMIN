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
import { validations } from "../../utils";
import { useFirebase } from "../../firebase";

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
        navigateTo("/users");
      }
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        {errorData && <h3>{errorData}</h3>}
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={loadingCUD}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default CreatePage;
