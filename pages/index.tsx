import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { MainGrafica } from "../components/grafica/MainGrafica";

const Home: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return <MainGrafica />;
};

export default Home;
