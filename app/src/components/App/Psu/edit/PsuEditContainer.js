import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPsuById } from "../../../../core/modules/Psu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import PsuEdit from "./PsuEdit";

const PsuEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchPsuById(id);
  }, [id]);

  const { data: psu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <PsuEdit
      psu={{ ...psu[0] }}
      onUpdate={(data) => setData(data)}
    />
  );
};

export default PsuEditContainer;