import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCaseById } from "../../../../core/modules/Case/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import CaseEdit from "./CaseEdit";

const CaseEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchCaseById(id);
  }, [id]);

  const { data, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <CaseEdit
      pccase={{ ...data[0] }}
      onUpdate={(data) => setData(data)}
    />
  );
};

export default CaseEditContainer;