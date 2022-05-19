import { useRouter } from "next/router";
import { useFirebase } from "../../../firebase";
import { FormTipoProducto } from "../../../components";
import { ITipoProducto } from "../../../interfaces";

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
    _collection: "tipoProductos",
    unique: ["nombre"],
    _id:
      router.query.id?.length == 20 ? (router.query.id as string) : undefined,
    read: router.query.id?.length == 20,
  });

  return (
    <>
      {router.query.id?.length == 20 ? (
        <>
          {!loading && data && (
            <FormTipoProducto
              errorData={errorData}
              sendData={sendData}
              loadingCUD={loadingCUD}
              navigateTo={navigateTo}
              data={data as unknown as ITipoProducto}
              editar
              deleteData={deleteData}
            />
          )}
        </>
      ) : (
        <FormTipoProducto
          errorData={errorData}
          sendData={sendData}
          loadingCUD={loadingCUD}
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};

export default CreatePage;
