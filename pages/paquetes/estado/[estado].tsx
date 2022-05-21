import type { NextPage } from "next";
import React, { useEffect } from "react";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useFirebase } from "../../../firebase";

import NextLink from "next/link";
import { ListLayout } from "../../../components";
import { DEPARTAMENTOS, MUNICIPIOS } from "../../../utils";
import { useRouter } from "next/router";
import { PAQUETES } from "../../../utils";
const url = "/paquetes";

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
  { field: "nombre", headerName: "Nombre", flex: 1.8, minWidth: 250 },
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
  {
    field: "telefono",
    headerName: "Teléfono",
    width: 135,
    valueFormatter: (e) => "+502 " + e.value,
  },
];
const ListPage: NextPage = () => {
  const router = useRouter();

  const { data, loading, navigateTo, setRefresh } = useFirebase({
    _collection: "paquetes",
    read: true,
  });

  useEffect(() => {
    if (!PAQUETES.some(({ id }) => id === router.query.estado)) {
      navigateTo("/");
    }
  }, [router.query.estado]);

  return (
    <ListLayout
      title={`Paquetes ${PAQUETES.find(
        ({ id }) => id === router.query.estado
      )?.nombre.toLowerCase()} `}
      loading={loading}
      columns={columns}
      data={data}
      refresh={() => {
        setRefresh(true);
      }}
      urlCreate={"en-oficina" === router.query.estado ? `${url}/create` : ""}
    />
  );
};

export default ListPage;
