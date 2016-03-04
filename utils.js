import AV from 'avoscloud-sdk'

export function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        return handlers[action.type]
            ? handlers[action.type](state, action)
            : state
    }
}

export function initLeanCloud(appId = localStorage.getItem('appId'), appKey = localStorage.getItem('appKey'), appMasterKey = localStorage.getItem('appMasterKey')) {
    AV.initialize(appId, appKey);
    AV.masterKey = appMasterKey
    AV._useMasterKey = true
}

export function deinitLeanCloud() {
    AV.applicationId = null
    AV.applicationKey = null
    AV.masterKey = null
    AV._useMasterKey = false
}
