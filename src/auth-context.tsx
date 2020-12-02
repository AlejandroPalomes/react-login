import {createContext} from 'react';

// const token = localStorage.getItem('token');
// const value = {
//     token: token ? token : '',
//     setToken: (e:string) => {value.token = e}
// }
const authContext = createContext({});

export default authContext;