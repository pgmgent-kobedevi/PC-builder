import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/cpu`, {
    headers: createHeaders(headers),
  });
};

const fetchCpuById = (id) => async (headers) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/cpu/${id}`, {
    headers: createHeaders(headers),
  }).catch((e) => e);
};

const updateCpu = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/cpu/${data.idProcessor}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createCpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, data, {
    headers: createHeaders(headers),
  });
};

export { fetchCpus, fetchCpuById, updateCpu, createCpu };
