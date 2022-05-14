import { useFirebase } from "../firebase";
import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

const Home = () => {
  const {
    loading,
    loadingCUD,
    data,
    setRefresh,
    sendData,
    deleteData,
    navigateTo,
  } = useFirebase({
    _collection: "usuarios",
    read: true,
  });

  return (
    <div>
      <NextLink href="/" passHref>
        <Link>
          <Button color={"info"}>Home</Button>
        </Link>
      </NextLink>
      <NextLink href="/Hola" passHref>
        <Link>
          <Button color={"info"}>Hola</Button>
        </Link>
      </NextLink>
      <NextLink href="/login" passHref>
        <Link>
          <Button color={"info"}>login</Button>
        </Link>
      </NextLink>
      <NextLink href="/publico" passHref>
        <Link>
          <Button color={"info"}>publico</Button>
        </Link>
      </NextLink>
      <NextLink href="/publico2" passHref>
        <Link>
          <Button color={"info"}>publico 222</Button>
        </Link>
      </NextLink>
      <h1>{loadingCUD ? "Escribiendo" : "No read"}</h1>

      <h1>{loading ? "cargando" : "se termino"}</h1>

      <button
        onClick={() => {
          deleteData("xAWxOJnFVepCDChkqTTA");
        }}
      >
        deleteData
      </button>
      <button
        onClick={() => {
          setRefresh(true);
        }}
      >
        recargar
      </button>
      <button
        onClick={() => {
          sendData(
            {
              edad: 5,
              nombre: "Arlex roldan",
            },
            () => {
              setRefresh(true);
            }
          );
        }}
      >
        actualizar
      </button>

      <div className="container">
        <div className="row">
          {!loading &&
            data.map(({ id, edad, nombre }) => (
              <div className="col-6" key={id}>
                <p>
                  {id}--{edad}--{nombre}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
