import axios from 'axios';

//let base = "http://10.201.76.174:8081/datalake/api/daasTag";
let base = process.env.API_HOST;

//获取标签
export const getTags = params => { return axios.post(`${base}/QueryTagsCatalog`, params).then(res => res.data); };

//查询标签数据
export const searchTags = params => { return axios.post(`${base}/ListTagData`, params).then(res => res.data); };

//标签
export const changeTags = params => { return axios.post(`${base}/Tagging`, params).then(res => res.data); };

//获取标签主体（人，车、基站这种）列表
export const getEntity = params => { return axios.post(`${base}/QueryTagsEntity`, params).then(res => res.data); };

//模糊查询
export const SearchTagsList = params => { return axios.post(`${base}/SearchTagsList`, params).then(res => res.data); };

//热门标签
export const getHotTag = params => { return axios.post(`${base}/QueryTagsTop`, params).then(res => res.data); };

//删除对象
export const deleteObject = params => { return axios.post(`${base}/DeleteTagData`, params).then(res => res.data); };



//export const getMenuList = params => { return axios.get(`${base}/operation/getOperationMenu`, { params: params }); };
//
//export const getMailPage = params => { return axios.post(`${base}/mail/list`, params).then(res => res.data); };
//
//export const removeMail = params => { return axios.delete(`${base}/mail/del`, { params: params }); };
//
//export const editBus = params => { return axios.patch(`${base}/operation/update`, params).then(res => res.data); };

