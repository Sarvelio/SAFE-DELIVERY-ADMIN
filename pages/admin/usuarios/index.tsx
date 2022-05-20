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
import { ROLES, DEPARTAMENTOS, MUNICIPIOS } from "../../../utils";
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

const url = "/admin/usuarios";

const columns: GridColDef[] = [
  {
    field: "",
    headerName: "Acción",
    width: 85,
    sortable: false,
    hide: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`${url}/${params.row.id}`}>
          <button className="btn btn-secondary btn-sm">Editar</button>
        </NextLink>
      );
    },
  },
  { field: "nombre", headerName: "Nombre", flex: 1.3, minWidth: 150 },
  { field: "correo", headerName: "Correo", flex: 1, minWidth: 120 },
  { field: "telefono", headerName: "Telefono" },
  {
    field: "departamento",
    headerName: "Departamento",
    valueFormatter: (e) =>
      DEPARTAMENTOS.find(({ id }) => id == e.value)?.nombre,
    flex: 1,
    minWidth: 120,
  },
  {
    field: "municipio",
    headerName: "Municipio",
    valueFormatter: (e) => MUNICIPIOS.find(({ id }) => id == e.value)?.nombre,
    flex: 1,
    minWidth: 120,
  },
  { field: "direccion", headerName: "Dirección", flex: 1, minWidth: 120 },
  { field: "rol", headerName: "Rol", width: 110 },
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
          <h3>Usuarios</h3>
        </div>
        <div className="col-12 d-flex">
          <span className="ms-auto mb-3">
            <NextLink href={`${url}/create`} passHref>
              <button className="btn btn-warning px-4">Agregar</button>
            </NextLink>
          </span>
        </div>
        <ul className="nav nav-tabs">
          {ROLES.map(({ id, nombre }) => (
            <li className="nav-item" key={id}>
              <button
                className={` nav-link ${rol == id ? "active" : ""}`}
                onClick={() => {
                  setRol(id);
                }}
              >
                {nombre}
              </button>
            </li>
          ))}
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
