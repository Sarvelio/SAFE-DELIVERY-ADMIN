import type { NextPage } from "next";
import db from "../firebase";
import { useContext, useEffect } from "react";
import Hola from "./Hola";
import { AuthContext } from "../context";

const Home: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Bienvenido: {user?.nombre}</h1>
    </div>
  );
};

export default Home;
