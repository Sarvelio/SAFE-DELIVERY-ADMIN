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
import { dateUtilis, DEPARTAMENTOS, MUNICIPIOS } from "../../../utils";
import { useRouter } from "next/router";
import { PAQUETES } from "../../../utils";
import { ModalTrasportista } from "../../../components/modal";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { IPaquete } from "../../../interfaces/paquete";
const url = "/transportista";

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
    field: "receptorDepartamento",
    headerName: "Departamento",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "receptorMunicipio",
    headerName: "Municipio",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "receptor",
    headerName: "Receptor",
    valueFormatter: ({ value }) => {
      const { nombre, direccion, telefono } = value;
      return `${nombre}, ${telefono}, Dirección ${direccion}`;
    },
    flex: 1,
    minWidth: 250,
    sortable: false,
    hide: false,
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
    field: "estado",
    headerName: "",
    width: 1,
    valueFormatter: (e) => "",
  },
];
const columns2: GridColDef[] = [
  {
    field: "fechaEnRuta",
    headerName: "Fecha asignado",
    valueFormatter: ({ value }) => dateUtilis.getDate(value),
    flex: 1,
    minWidth: 150,
    sortable: false,
    hide: false,
  },
  {
    field: "transportista",
    headerName: "Transportista",
    valueFormatter: ({ value }) => value?.nombre,
    flex: 1,
    minWidth: 200,
    sortable: false,
    hide: false,
  },
];
const ListPage: NextPage = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);

  const { data, loading, navigateTo, setRefresh } = useFirebase({
    _collection: "paquetes",
    idTransportista: user!.id,
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
        title={`Paquetes ${PAQUETES.find(
          ({ id }) => id === router.query.estado
        )?.nombre.toLowerCase()} `}
        loading={loading}
        columns={columns} // @ts-ignore
        data={(data as IPaquete[]).map((a) => {
          return {
            ...a,
            receptorDepartamento: DEPARTAMENTOS.find(
              ({ id }) => id == a.receptor.departamento
            )?.nombre,
            receptorMunicipio: MUNICIPIOS.find(
              ({ id }) => id == a.receptor.municipio
            )?.nombre,
          };
        })}
        refresh={refresh}
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
