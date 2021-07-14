import axios from "axios";
var ServerURL = "http://localhost:3001";

const postDataAxios = async (Url, body, config) => {
  try {
    var url = `${ServerURL}/${Url}`;
    config = { "content-type": "application/json;charset=utf-8" };
    const response = await axios.post(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getDataAxios = async (Url) => {
  try {
    var url = `${ServerURL}/${Url}`;
    var config = { "content-type": "application/json;charset=utf-8" };
    var response = await axios.get(url, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const postDataAndImageAxios = async (Url, body, config) => {
  try {
    var url = `${ServerURL}/${Url}`;
    config = { "content-type": "multipart/form-data" };
    var response = await axios.post(url, body, config);
    var result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

const putDataAxios = async (Url, body) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = { "content-type": "application/json;charset=utf-8" };
    const response = await axios.put(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const patchDataAxios = async (Url, body) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = { "content-type": "application/json;charset=utf-8" };
    const response = await axios.patch(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteDataAxios = async (Url) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = { "content-type": "application/json" };
    const response = await axios.delete(url, config);
    var result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  ServerURL,
  getDataAxios,
  postDataAxios,
  postDataAndImageAxios,
  putDataAxios,
  patchDataAxios,
  deleteDataAxios,
};
