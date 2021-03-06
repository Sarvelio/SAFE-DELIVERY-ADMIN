import type { NextPage } from "next";
import { useContext, useEffect, FC, useState } from "react";
import NextLink from "next/link";
import { AuthContext } from "../../context/auth";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import { MenuOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ListSubheader,
} from "@mui/material";
import { useRouter } from "next/router";
import { UiContext } from "../../context/ui";
import { TYPE_ROLES } from "../../utils/roles";

export const Sidebar = ({ children }: { children: JSX.Element }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(true);
  const { asPath } = useRouter();
  const { isLoading } = useContext(UiContext);

  useEffect(() => {
    setOpenMenu(false);
  }, [asPath]);

  const urls =
    user?.rol == TYPE_ROLES.administrador
      ? [
          { path: "/", name: "Inicio" },
          { path: "/admin/usuarios", name: "Usuarios" },
          { path: "/admin/tipo-productos", name: "Tipo de productos" },
          { path: "/admin/sucursales", name: "Sucursales" },
        ]
      : user?.rol == TYPE_ROLES.oficinista
      ? [
          { path: "/", name: "Inicio" },
          { path: "/paquetes/estado/en-oficina", name: "Paquetes en oficina" },
          { path: "/paquetes/estado/en-ruta", name: "Paquetes en ruta" },
          { path: "/paquetes/estado/entregado", name: "Paquetes entregado" },
        ]
      : user?.rol == TYPE_ROLES.transportista
      ? [
          { path: "/", name: "Inicio" },
          {
            path: "/transportista/estado/en-ruta",
            name: "Paquetes en el trasporte",
          },
          {
            path: "/transportista/estado/entregado",
            name: "Paquetes entregados",
          },
        ]
      : [];

  const validpath = (path: string) => {
    if (path === "/") {
      return path === asPath;
    }
    return asPath.startsWith(path);
  };
  return (
    <div className="container-web mx-auto px-0">
      <div
        className="d-flex bg-movil position-relative "
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            width: "280px",
            minHeight: "100vh ",
            zIndex: 2,
          }}
          className={`d-none d-md-block ${openMenu ? "sidebar-active" : ""}`}
        >
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-blue h-100 "
            style={{ width: "280px" }}
          >
            <div className="text-center bg-white">
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              {urls.map(({ path, name }) => (
                <li
                  className={`nav-item  ${
                    validpath(path) ? "nav-active" : "nav-not-active"
                  }`}
                  key={path + name}
                >
                  <NextLink href={path} passHref>
                    <Button className="d-block pt-3 pb-2">{name}</Button>
                  </NextLink>
                </li>
              ))}
            </ul>
            <hr />
            <div className="">
              <strong className="ms-2">{user?.nombre}</strong>
              <div className="d-grid gap-2">
                <button
                  className="btn text-danger mt-3"
                  type="button"
                  onClick={logout}
                >
                  Cerrar Sesi??n
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-100 position-relative"
          style={{ background: "#f6f6f6" }}
        >
          <div className="d-md-none d-flex bg-blue">
            <span
              className="ms-auto p-2 bg-blue text-white"
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <MenuOutlined sx={{ fontSize: 35, fill: "white" }} />
            </span>
          </div>
          <div className="position-absolute h-100 w-100">
            <div
              className={`position-absolute h-100 w-100 loading-spinner-div justify-content-center align-content-center ${
                isLoading ? "d-flex" : "d-none"
              }`}
              onClick={() => {
                setOpenMenu(false);
              }}
              style={{ background: "#00000025" }}
            >
              <div
                className="spinner-border text-primary my-auto mx-auto  "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div
              className=" w-100 container-web p-2 p-sm-3 p-md-4"
              style={{ background: "#f6f6f6" }}
            >
              {children}
            </div>
          </div>
        </div>
        <div
          className={` position-absolute h-100 w-100 d-none  ${
            openMenu ? "sidebar-lock" : ""
          }`}
          onClick={() => {
            setOpenMenu(false);
          }}
          style={{ background: "#00000038" }}
        ></div>
      </div>
    </div>
  );
};
