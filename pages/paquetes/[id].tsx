import { useRouter } from "next/router";
import { useFirebase } from "../../firebase";
import { FormPaquete } from "../../components";
import { IPaquete } from "../../interfaces";

const CreatePage = () => {
  const router = useRouter();
  const {
    loadingCUD,
    sendData,
    navigateTo,
    errorData,
    data,
    loading,
    deleteData,
  } = useFirebase({
    _collection: "paquetes",
    _id:
      router.query.id?.length == 20 ? (router.query.id as string) : undefined,
    read: router.query.id?.length == 20,
  });

  const { data: tipoProducto, loading: loadingTipoProducto } = useFirebase({
    _collection: "tipoProductos",
    read: true,
  });

  return (
    <>
      {router.query.id?.length == 20 ? (
        <>
          {!loading && !loadingTipoProducto && data && (
            <FormPaquete
              errorData={errorData}
              sendData={sendData}
              loadingCUD={loadingCUD}
              navigateTo={navigateTo}
              data={data as unknown as IPaquete}
              editar
              deleteData={deleteData}
              tipoProducto={tipoProducto}
            />
          )}
        </>
      ) : (
        <>
          {!loadingTipoProducto && (
            <FormPaquete
              errorData={errorData}
              sendData={sendData}
              loadingCUD={loadingCUD}
              navigateTo={navigateTo}
              tipoProducto={tipoProducto}
            />
          )}
        </>
      )}
    </>
  );
};

export default CreatePage;
