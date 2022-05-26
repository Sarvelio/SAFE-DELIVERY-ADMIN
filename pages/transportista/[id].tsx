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
    _id: router.query.id?.length == 20 ? (router.query.id as string) : "",
    read: true,
  });

  const { data: tipoProducto, loading: loadingTipoProducto } = useFirebase({
    _collection: "tipoProductos",
    read: true,
  });

  const _navigateTo = () => {
    navigateTo("/transportista/estado/en-ruta");
  };

  const entregarPaquete = () => {
    sendData(
      { ...data, estado: "entregado", fechaEntregado: new Date() },
      _navigateTo
    );
  };

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
              entregarPaquete={entregarPaquete}
              tipoProducto={tipoProducto}
              onlyRead
              transportista
              esEntregarPaquete={
                (data as unknown as IPaquete).estado == "en-ruta"
              }
            />
          )}
        </>
      ) : (
        <>{navigateTo("/")}</>
      )}
    </>
  );
};

export default CreatePage;
