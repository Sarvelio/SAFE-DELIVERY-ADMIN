import { useRouter } from "next/router";
import { useFirebase } from "../../../firebase";
import { FormSucursal } from "../../../components";
import { ISucursal } from "../../../interfaces";

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
    _collection: "sucursales",
    _id:
      router.query.id?.length == 20 ? (router.query.id as string) : undefined,
    read: router.query.id?.length == 20,
  });

  return (
    <>
      {router.query.id?.length == 20 ? (
        <>
          {!loading && data && (
            <FormSucursal
              errorData={errorData}
              sendData={sendData}
              loadingCUD={loadingCUD}
              navigateTo={navigateTo}
              data={data as unknown as ISucursal}
              editar
              deleteData={deleteData}
            />
          )}
        </>
      ) : (
        <FormSucursal
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
