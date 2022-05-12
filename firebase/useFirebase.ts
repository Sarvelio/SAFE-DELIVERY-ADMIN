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
} from "firebase/firestore";
import db from "./configFirebase";

type ICollection = "users" | "usuarios";
interface IUseFirebase {
  _collection: ICollection;
  _id?: string;
  leer?: boolean;
}
const useFirebase = ({ _collection, _id, leer = false }: IUseFirebase) => {
  const [data, setDataReceive] = useState<[]>([]);
  const [loading, setLoading] = useState(leer);
  const [refresh, setRefresh] = useState(true);
  const [loadingCUD, setLoadingCUD] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (refresh && leer) {
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
  const createData = async (newData: any) => {
    const _doc = await addDoc(collection(db, _collection), newData);
  };
  const updateDataByID = async (newData: any) => {
    const _doc = await updateDoc(doc(db, _collection, _id!), newData);
  };
  const deleteDataById = async (_idDelete: string) => {
    const _doc = await deleteDoc(doc(db, _idDelete, _idDelete));
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
    setLoadingCUD(true);
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
      });
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
