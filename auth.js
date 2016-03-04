import AV from 'avoscloud-sdk'

export function logIn(password) {
    return fetch('https://12345.上山打老虎', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `password=${password}`
    }).then(function (response) {
        return response.json()
    }).then(function (jsonResponse) {
        return new AV.Promise(function (resolve, reject) {
            if (jsonResponse.authed) {
                localStorage.setItem('appId', jsonResponse.appId)
                localStorage.setItem('appKey', jsonResponse.appKey)
                localStorage.setItem('appMasterKey', jsonResponse.appMasterKey)

                resolve('LogIn Successfully.')
            } else {
                reject('Password is incorrect.')
            }
        })
    })
}

export function loggedIn() {
    return localStorage.getItem('appId') && localStorage.getItem('appKey') && localStorage.getItem('appMasterKey')
}

export function logOut() {
    localStorage.removeItem('appId')
    localStorage.removeItem('appKey')
    localStorage.removeItem('appMasterKey')
}
