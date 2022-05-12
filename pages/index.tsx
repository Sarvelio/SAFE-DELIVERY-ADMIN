import type { NextPage } from "next";
import db from "../firebase";
import { useEffect } from "react";
import Hola from "./Hola";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hola mundo</h1>
      <h1>SAFE DELIVERY ADMIN</h1>
      <Hola />
    </div>
  );
};

export default Home;
