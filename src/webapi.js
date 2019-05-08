function getUserInfo(url, user) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            req.status === 200 ? resolve(JSON.parse(req.response)) : reject(req.response);
        };
        req.onerror = () => reject(req.status);
        req.open('POST', url);
        req.setRequestHeader('email', user.email);
        req.setRequestHeader('pass', user.pass);
        req.send();
    })
}

function logIn(url, data) {
    return new Promise((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.onload = () => {
            req.status === 200 ? resolve(JSON.parse(req.response)) : reject(req.response);
        };
        req.onerror = () => reject(req.status);
        req.open('POST', url);
        req.setRequestHeader('email', data.email);
        req.setRequestHeader('pass', data.pass);
        req.send();
    });
}

function logOut(url, data) {
    return new Promise((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.onload = () => {
            req.status === 200 ? resolve(req.response) : reject(req.response);
        };
        req.onerror = () => reject(req.status);
        req.open('POST', url);
        req.setRequestHeader('email', data);
        req.send();
    })
}

function signIn(url, data) {
    return new Promise((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.onload = () => {
            req.status === 200 ? resolve(JSON.parse(req.response)) : reject(req.response);
        };
        req.onerror = () => reject(req.status);
        req.open('POST', url);
        req.setRequestHeader('email', data.email);
        req.setRequestHeader('name', data.name);
        req.setRequestHeader('pass', data.pass);
        req.send();
    })
}
function updateProfile(url, data) {
    return new Promise((resolve, reject)=> {
        let req = new XMLHttpRequest();
        req.onload = () => {
            req.status === 200 ? resolve(JSON.parse(req.response)) : reject(req.response);
        };
        req.onerror = () => reject(req.status);
        req.open('POST', url);
        req.setRequestHeader('email', data.email);
        req.setRequestHeader('pass', data.pass);
        req.setRequestHeader('name', data.name);
        req.setRequestHeader('phone', data.phone);
        req.setRequestHeader('address', data.address);
        req.send();
    })
}

export {getUserInfo, logIn, signIn, updateProfile, logOut};