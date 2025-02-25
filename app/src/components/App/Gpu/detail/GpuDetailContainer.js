import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchOriginalGpuById } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import GpuDetail from "./GpuDetail";

const GpuDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchOriginalGpuById(id);
  }, [id]);

  const { data: gpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  return <GpuDetail gpu={gpu[0]} />;
};

export default GpuDetailContainer;
