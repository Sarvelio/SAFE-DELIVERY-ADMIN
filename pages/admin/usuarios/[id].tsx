import { useRouter } from "next/router";
import { useFirebase } from "../../../firebase";
import { FormUsuario } from "../../../components";
import { IUser } from "../../../interfaces";

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
    _collection: "usuarios",
    unique: ["correo", "nombre"],
    _id:
      router.query.id?.length == 20 ? (router.query.id as string) : undefined,
    read: router.query.id?.length == 20,
  });

  return (
    <>
      {router.query.id?.length == 20 ? (
        <>
          {!loading && data && (
            <FormUsuario
              errorData={errorData}
              sendData={sendData}
              loadingCUD={loadingCUD}
              navigateTo={navigateTo}
              data={{
                ...(data as unknown as IUser),
                contrasena: "",
              }}
              currentPassword={(data as unknown as IUser).contrasena}
              editar
              deleteData={deleteData}
            />
          )}
        </>
      ) : (
        <FormUsuario
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
