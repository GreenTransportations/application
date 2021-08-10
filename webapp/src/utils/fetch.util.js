import { API_CONFIG } from "../configs/api.config";


export const FETCH = {
    GET: (service, route, accessCode) => {
        return fetch(`${API_CONFIG.URL}/${service}/${route}`, {
            method: "GET", 
            headers: {'Authorization' : accessCode}
        })
    },
    
    POST: (service, route, accessCode, content) => {
        return fetch(`${API_CONFIG.URL}/${service}/${route}`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization' : accessCode 
            }, 
            body: JSON.stringify(content)
        })
    },

    DELETE: (service, route, accessCode, content) => {
        return fetch(`${API_CONFIG.URL}/${service}/${route}`, {
            method: "DELETE", 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization' : accessCode 
            }, 
            body: JSON.stringify(content)
        })
    },
};

