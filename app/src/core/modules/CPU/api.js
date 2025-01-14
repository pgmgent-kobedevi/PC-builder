import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpus = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/cpu/paginate/${page}/${perPage}`, {
    headers: createHeaders(headers),
  });
};

const fetchCompatibleCpus = async (page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/cpu/${page}/${perPage}`);
};

const fetchCompatibleFilteredCpus = async (query) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/compatible/cpu/filter/${query.replace(/[/^#\%]/g,"")}`);
};

const fetchCpuById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/cpu/${id}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCpuByIdBuilder = async(id) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/compatible/cpu/info/${id}`
  );
};

const fetchFilteredCpus = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/cpu/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
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

const deleteCpu = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/cpu/${id}`, {
    headers: createHeaders(headers),
  });
};

export { 
  fetchCpus, 
  fetchCompatibleCpus, 
  fetchCompatibleFilteredCpus,
  fetchCpuById, 
  fetchCpuByIdBuilder,
  fetchFilteredCpus, 
  updateCpu, 
  createCpu, 
  deleteCpu 
};
