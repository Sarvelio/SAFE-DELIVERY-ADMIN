import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import db from "./configFirebase";

type ICollection = "users" | "usuarios";
interface IUseFirebase {
  _collection: ICollection;
  _id?: string;
  read?: boolean;
  unique?: string[];
}
const useFirebase = ({
  _collection,
  _id,
  read = false,
  unique = [],
}: IUseFirebase) => {
  const [data, setDataReceive] = useState<[]>([]);
  const [loading, setLoading] = useState(read);
  const [refresh, setRefresh] = useState(true);
  const [loadingCUD, setLoadingCUD] = useState(false);
  const [errorData, setErrorData] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (refresh && read) {
      setLoading(true);
      setRefresh(false);
      let _data;
      if (_id) {
        _data = getDataByID();
      } else {
        _data = getListData();
      }
      _data // @ts-ignore
        .then(setDataReceive)
        .catch((error) => {
          console.log("--error--", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refresh]);

  const getListData = async (): Promise<[]> => {
    const _docs = await getDocs(collection(db, _collection));
    const response: any = [];
    _docs.forEach((_doc) => {
      response.push({ id: _doc.id, ..._doc.data() });
    });
    return response;
  };
  const getDataByID = async (): Promise<{}> => {
    const _doc = await getDoc(doc(db, _collection, _id!));
    return { id: _doc.id, ..._doc.data() };
  };
  const createData = async (newData: {}) => {
    const _doc = await addDoc(collection(db, _collection), newData);
  };
  const updateDataByID = async (newData: {}) => {
    const _doc = await updateDoc(doc(db, _collection, _id!), newData);
  };
  const deleteDataById = async (_idDelete: string) => {
    const _doc = await deleteDoc(doc(db, _idDelete, _idDelete));
  };
  const getDataUnique = async (newData: {}, unique: string): Promise<{}> => {
    const _doc = await getDocs(
      query(
        collection(db, _collection), // @ts-ignore
        where(unique, "==", newData[unique])
      )
    );
    return _doc.size > 0;
  };

  const deleteData = (
    _idDelete: string,
    callBack?: () => void,
    callBackError?: () => void
  ) => {
    if (_idDelete) {
      setLoadingCUD(true);
      const _data = deleteDataById(_idDelete);
      _data
        .then((e) => {
          if (callBack) callBack();
        })
        .catch((error) => {
          console.log("--error--", error);
          if (callBackError) callBackError();
        })
        .finally(() => {
          setLoadingCUD(false);
        });
    }
  };

  const sendData = (
    newData: {},
    callBack?: () => void,
    callBackError?: () => void
  ) => {
    const _sendData = () => {
      let _data;
      if (_id) {
        _data = updateDataByID(newData);
      } else {
        _data = createData(newData);
      }
      _data
        .then((e) => {
          if (callBack) callBack();
        })
        .catch((error) => {
          console.log("--error--", error);
          if (callBackError) callBackError();
        })
        .finally(() => {
          setLoadingCUD(false);
          if (errorData) setErrorData("");
        });
    };

    setLoadingCUD(true);
    if (unique.length > 0) {
      const _promise = [];
      for (let i = 0; i < unique.length; i++) {
        _promise.push(
          getDataUnique(newData, unique[i]).then((a) => {
            if (a) {
              setErrorData(`Ya existe un ${unique[i]} identico`);
              return `Ya existe un ${unique[i]} identico`;
            }
          })
        );
      }
      Promise.all(_promise)
        .then((values) => {
          if (!values.some((a) => !!a)) {
            _sendData();
          } else {
            setLoadingCUD(false);
          }
        })
        .catch((error) => {
          console.log("--error--", error);
          if (callBackError) callBackError();
        });
    } else {
      _sendData();
    }
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return {
    loading,
    loadingCUD,
    data,
    setRefresh,
    sendData,
    deleteData,
    navigateTo,
    errorData,
  };
};

export {
  useFirebase,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
};
