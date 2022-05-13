import type { NextPage } from "next";
import db from "../firebase";
import { useContext, useEffect } from "react";
import Hola from "./Hola";
import { AuthContext } from "../context";

const Home: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Hola mundo:{user?.nombre}</h1>
      {isLoggedIn && (
        <button className="btn btn-primary" onClick={logout}>
          cerrar sesion
        </button>
      )}
      <h1>SAFE DELIVERY ADMIN</h1>
      <Hola />
    </div>
  );
};

export default Home;
