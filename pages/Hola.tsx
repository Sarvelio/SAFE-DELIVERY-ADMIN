import { useFirebase } from "../firebase";

const Home = () => {
  const {
    loading,
    loadingCUD,
    data,
    setRefresh,
    sendData,
    deleteData,
    navigateTo,
  } = useFirebase({
    _collection: "usuarios",
    read: true,
  });

  return (
    <div>
      <h1>{loadingCUD ? "Escribiendo" : "No read"}</h1>

      <h1>{loading ? "cargando" : "se termino"}</h1>

      <button
        onClick={() => {
          deleteData("xAWxOJnFVepCDChkqTTA");
        }}
      >
        deleteData
      </button>
      <button
        onClick={() => {
          setRefresh(true);
        }}
      >
        recargar
      </button>
      <button
        onClick={() => {
          sendData(
            {
              edad: 5,
              nombre: "Arlex roldan",
            },
            () => {
              setRefresh(true);
            }
          );
        }}
      >
        actualizar
      </button>
      <div className="container">
        <div className="row">
          {!loading &&
            data.map(({ id, edad, nombre }) => (
              <div className="col-6" key={id}>
                <p>
                  {id}--{edad}--{nombre}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
