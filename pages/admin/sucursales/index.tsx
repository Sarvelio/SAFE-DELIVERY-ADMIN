import type { NextPage } from "next";
import React, { useEffect } from "react";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useFirebase } from "../../../firebase";

import NextLink from "next/link";
import { ListLayout } from "../../../components";

const url = "/admin/sucursales";

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
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "departamento", headerName: "Departamento", width: 135 },
  { field: "municipio", headerName: "Municipio", width: 135 },
  { field: "direccion", headerName: "Dirección", width: 135 },
  {
    field: "telefono",
    headerName: "Teléfono",
    width: 135,
    valueFormatter: (e) => "+502 " + e.value,
  },
];
const ListPage: NextPage = () => {
  const { data, loading } = useFirebase({
    _collection: "sucursales",
    read: true,
  });

  return (
    <ListLayout
      title="Sucursales"
      loading={loading}
      columns={columns}
      data={data}
      urlCreate={`${url}/create`}
    />
  );
};

export default ListPage;
