const baseUrl = 'http://localhost:8087/api/v1'
const config = {
    login: {
        method: 'post',
        url: `${baseUrl}/login`,
        setBody: (username, password) => {
            return JSON.stringify({email: username, password: password});
        }
    },
    list: {
        method: 'get',
        url: `${baseUrl}/password/list`,
        setHeaders: (token) => {return {'token': token}}
    },
    show: {
        method: 'post',
        url:`${baseUrl}/password/show`,
        setBody: (id, master) => {
            return JSON.stringify({id, master});
        },
        setHeaders: (token) => {return {'token': token}}
    },
    update: {
        method: 'post',
        url:`${baseUrl}/password/update`,
        setBody: (id,userName,password,link,description, master) => {
            return JSON.stringify({id,userName,password,link,description, master});
        },
        setHeaders: (token) => {return {'token': token}}
    },
    create : {
        method: 'post',
        url:`${baseUrl}/password/create`,
        setBody: (userName,password,link,description, master) => {
            return JSON.stringify({userName,password,link,description, master});
        },
        setHeaders: (token) => {return {'token': token}}
    }
}

export default config;