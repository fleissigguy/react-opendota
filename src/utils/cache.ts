export const setCache = (key:string, data:object):any => {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
};
export const getCache = (key:string):any => {
  return JSON.parse(localStorage.getItem(key));
};
export const clearCache = (key:string) =>{
  localStorage.removeItem(key);
};
export const hasCache = (key:string):boolean=>{
  return !!localStorage.getItem(key);
};
