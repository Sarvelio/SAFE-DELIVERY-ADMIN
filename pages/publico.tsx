import type { NextPage } from "next";
import db from "../firebase";
import { useContext, useEffect, FC } from "react";
import Hola from "./Hola";
import { AuthContext } from "../context";
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
import NextLink from "next/link";
const Proteger = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Proteger</h1>
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
          <Button color={"info"}>publico 22</Button>
        </Link>
      </NextLink>
    </div>
  );
};

Proteger.requireAuth = false;

export default Proteger;
