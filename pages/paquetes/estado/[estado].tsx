import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useFirebase } from "../../../firebase";

import NextLink from "next/link";
import { ListLayout } from "../../../components";
import { DEPARTAMENTOS, MUNICIPIOS } from "../../../utils";
import { useRouter } from "next/router";
import { PAQUETES } from "../../../utils";
import { ModalTrasportista } from "../../../components/modal";
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
          <button className="btn btn-secondary btn-sm" style={{ width: 65 }}>
            {params.row.estado == "en-oficina" ? "Editar" : "Ver"}
          </button>
        </NextLink>
      );
    },
  },
  {
    field: "peso",
    headerName: "Peso",
    width: 100,
    valueFormatter: (e) => e.value + " Libras",
  },
  {
    field: "tipoProducto",
    headerName: "Tipo Producto",
    valueFormatter: (e) => e.value.nombre,
    width: 125,
  },
  {
    field: "totalPagar",
    headerName: "Total a pagar",
    width: 100,
    valueFormatter: (e) => "Q " + e.value,
  },
  {
    field: "emisor",
    headerName: "Emisor",
    valueFormatter: ({ value }) => {
      const { nombre, departamento, municipio, direccion, telefono } = value;
      return `${nombre}, ${telefono} de ${
        DEPARTAMENTOS.find(({ id }) => id == departamento)?.nombre
      }, ${MUNICIPIOS.find(({ id }) => id == municipio)?.nombre}, ${direccion}`;
    },
    flex: 1,
    minWidth: 250,
    sortable: false,
    hide: false,
  },
  {
    field: "receptor",
    headerName: "Receptor",
    valueFormatter: ({ value }) => {
      const { nombre, departamento, municipio, direccion, telefono } = value;
      return `${nombre}, ${telefono} de ${
        DEPARTAMENTOS.find(({ id }) => id == departamento)?.nombre
      }, ${MUNICIPIOS.find(({ id }) => id == municipio)?.nombre}, ${direccion}`;
    },
    flex: 1,
    minWidth: 250,
    sortable: false,
    hide: false,
  },
  {
    field: "estado",
    headerName: "",
    width: 1,
    valueFormatter: (e) => "",
  },
];
const ListPage: NextPage = () => {
  const router = useRouter();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);

  const { data, loading, navigateTo, setRefresh } = useFirebase({
    _collection: "paquetes",
    read: true,
  });

  useEffect(() => {
    if (!PAQUETES.some(({ id }) => id === router.query.estado)) {
      navigateTo("/");
    }
  }, [router.query.estado]);

  const refresh = () => {
    setSelectionModel([]);
    setRefresh(true);
  };

  return (
    <>
      {open && (
        <ModalTrasportista
          open={true}
          setOpen={setOpen}
          selectionModel={selectionModel}
          refresh={refresh}
          navigateTo={navigateTo}
        />
      )}
      <ListLayout
        checkboxSelection={"en-oficina" === router.query.estado}
        setSelectionModel={setSelectionModel}
        selectionModel={selectionModel}
        setOpen={setOpen}
        title={`Paquetes ${PAQUETES.find(
          ({ id }) => id === router.query.estado
        )?.nombre.toLowerCase()} `}
        loading={loading}
        columns={columns}
        data={data}
        refresh={refresh}
        urlCreate={"en-oficina" === router.query.estado ? `${url}/create` : ""}
        filterModel={{
          items: [
            {
              columnField: "estado",
              operatorValue: "contains",
              value: router.query.estado,
            },
          ],
        }}
      />
    </>
  );
};

export default ListPage;
