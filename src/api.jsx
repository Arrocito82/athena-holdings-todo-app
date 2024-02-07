import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers['x-api-key '] = process.env.REACT_APP_API_KEY;
const createManyHiredEmployees=(data)=>{
    return axios.post(URL_BASE+'/api/hiredEmployees/collection', data);
}
const createManyDepartments=(data)=>{
    return axios.post(URL_BASE+'/api/departments/collection', data);
}
const createManyJobs=(data)=>{
    return axios.post(URL_BASE+'/api/jobs/collection', data);
}
const getYears = ()=>{
    return axios.get(URL_BASE+'/api/years');
}
const getReporte1 = (year)=>{
    return axios.get(URL_BASE+`/api/hiredEmployees/${year}/reporte1`);
};
const getReporte2 = (year)=>{
    return axios.get(URL_BASE+`/api/hiredEmployees/${year}/reporte2`);
};
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