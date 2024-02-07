import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers['x-api-key '] = process.env.REACT_APP_API_KEY;

const getTasks = (status=null)=>{
    let params={}
    if(status){
        params.status = status;
    }
    return axios({
        method: "get",
        url: `${URL_BASE}/items`,
        params: params,
      });
};
const getTask = (id)=>{
    return axios({
        method: "get",
        url: `${URL_BASE}/items/${id}`
      });
};
const createTask = (data)=>{
    return axios.post(`${URL_BASE}/items`, data);
};
const updateTask = (id, data)=>{
    console.log(id);
    return axios.put(`${URL_BASE}/items/${id}`, data);
};
const deleteTask = (id)=>{
    return axios.delete(`${URL_BASE}/items/${id}`);
};
export {getTasks, createTask, getTask, updateTask, deleteTask};