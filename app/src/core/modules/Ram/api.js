import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRam = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/ram/paginate/${page}/${perPage}`, {
    headers: createHeaders(headers),
  });
};

const fetchFilteredRam = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/ram/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCompatibleRam = async (slots, idRamType, page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/ram/${slots}/${idRamType}/${page}/${perPage}`);
};

const fetchCompatibleRamFilter = async (slots, idRamType, query) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/ram/filter/${slots}/${idRamType}/${query.replace(/[/^#\%]/g,"")}`);
};

const fetchRamById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/ram/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchRamByIdBuilder = async (id) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/compatible/ram/info/${id}`
  );
};

const updateRam = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/ram/${data.idRam}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createRam = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/ram`, 
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const deleteRam = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/ram/${id}`, {
    headers: createHeaders(headers),
  });
};

export { fetchRam, fetchCompatibleRam, fetchCompatibleRamFilter, fetchFilteredRam, createRam, fetchRamById, fetchRamByIdBuilder, updateRam, deleteRam };
