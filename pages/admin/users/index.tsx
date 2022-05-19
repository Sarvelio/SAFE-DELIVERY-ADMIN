import type { NextPage } from "next";
import React, { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  esES,
} from "@mui/x-data-grid";
import { useFirebase } from "../../../firebase";

import NextLink from "next/link";
import { ListLayout } from "../../../components";
import { useState } from "react";
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

const columns: GridColDef[] = [
  { field: "rol", headerName: "Rol", width: 120 },
  { field: "nombre", headerName: "Nombre", width: 200 },
  { field: "correo", headerName: "Correo" },
  { field: "telefono", headerName: "Telefono" },
  { field: "id", headerName: "Id", width: 250 },
];
const ListPage: NextPage = () => {
  const { data, loading } = useFirebase({
    _collection: "usuarios",
    read: true,
  });
  const [rol, setRol] = useState("administrador");

  return (
    <div className="container-web py-3 px-3 px-sm-4 px-md-2">
      <div className="row ">
        <div className="col-12 d-flex">
          <h3>Usuario</h3>
        </div>
        <div className="col-12 d-flex">
          <span className="ms-auto mb-3">
            <NextLink href="/admin/users/create" passHref>
              <button className="btn btn-warning px-4"> Agregar</button>
            </NextLink>
          </span>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={` nav-link ${rol == "administrador" ? "active" : ""}`}
              onClick={() => {
                setRol("administrador");
              }}
            >
              Administrador
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` nav-link ${rol == "oficinista" ? "active" : ""}`}
              onClick={() => {
                setRol("oficinista");
              }}
            >
              Oficinista
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` nav-link ${rol == "piloto" ? "active" : ""}`}
              onClick={() => {
                setRol("piloto");
              }}
            >
              Piloto
            </button>
          </li>
        </ul>
        <div
          className="col-12 d-inline shadow px-0"
          style={{ height: "667px" }}
        >
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            filterModel={{
              items: [
                {
                  columnField: "rol",
                  operatorValue: "contains",
                  value: rol,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
