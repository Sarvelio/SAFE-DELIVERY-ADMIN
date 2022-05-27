import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { signIn, getSession, getProviders } from "next-auth/react";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { useRouter } from "next/router";
import { Header } from "../../components/ui";

type FormData = {
  correo: string;
  contrasena: string;
};
type IRes = {
  error: string;
  status: number;
  ok: boolean;
  url: string;
};
const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ correo, contrasena }: FormData) => {
    setShowError(false);
    await signIn("credentials", { correo, contrasena, redirect: false })
      .then((res) => {
        // @ts-ignore
        if (res.error) {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        }
      })
      .catch((error) => {
        console.log("--error--", error);
      });
  };

  return (
    <>
      <Header />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <div className="container">
          <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            {/* <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}> */}
            <div className="row">
              <div style={{ maxWidth: "350px" }} className="mx-auto">
                <Grid item xs={12}>
                  <h1 className="fw-bold text-center my-5">Iniciar Sesión</h1>
                  <Chip
                    label="No reconocemos ese usuario / contraseña"
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn mb-3"
                    sx={{ display: showError ? "flex" : "none" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Correo"
                    variant="filled"
                    fullWidth
                    {...register("correo", {
                      required: "Este campo es requerido",
                      validate: validations.isEmail,
                    })}
                    error={!!errors.correo}
                    helperText={errors.correo?.message}
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    variant="filled"
                    fullWidth
                    {...register("contrasena", {
                      required: "Este campo es requerido",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    })}
                    error={!!errors.contrasena}
                    helperText={errors.contrasena?.message}
                  />
                </Grid>

                <div className="d-grid gap-2 mt-5">
                  <button type="submit" className="btn btn-warning">
                    Ingresar
                  </button>
                </div>
              </div>
            </div>
            {/* </Grid>
        </Box> */}
          </form>
        </div>
      </Box>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const session = await getSession({ req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
LoginPage.requireAuth = false;
LoginPage.lockedAfterLogin = true;

export default LoginPage;
