import type { NextPage } from "next";
import React, { useEffect } from "react";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useFirebase } from "../../../firebase";

import NextLink from "next/link";
import { ListLayout } from "../../../components";

const url = "/admin/tipo-productos";

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
  { field: "precioPorLibra", headerName: "Precio por Libra", width: 135 },
  { field: "id", headerName: "Id", width: 250 },
];
const ListPage: NextPage = () => {
  const { data, loading } = useFirebase({
    _collection: "tipoProductos",
    read: true,
  });

  return (
    <ListLayout
      title="Tipo de productos"
      loading={loading}
      columns={columns}
      data={data}
      urlCreate={`${url}/create`}
    />
  );
};

export default ListPage;
