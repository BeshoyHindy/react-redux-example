import update from 'react-addons-update'
import * as actionType from '../actions/homeRecommendations'
import { createReducer } from '../utils'

export default createReducer({totalCount: 0, currentPage: 1, recommendations: {}}, {
    // 获取首页推荐
    [actionType.FETCH_HOME_RECOMMENDATIONS_START](state, action) {
        return state
    },
    [actionType.FETCH_HOME_RECOMMENDATIONS_SUCCESS](state, action) {
        return update(state, {
            totalCount: {$set: action.totalCount},
            currentPage: {$set: action.page},
            recommendations: {[action.page]: {$set: action.recommendations}}
        })
    },
    [actionType.FETCH_HOME_RECOMMENDATIONS_ERROR] (state, action){
        return state
    },

    // 移除首页推荐
    [actionType.REMOVE_HOME_RECOMMENDATION_START](state, action) {
        return state
    },
    [actionType.REMOVE_HOME_RECOMMENDATION_SUCCESS](state, action) {
        return update(state, {
            recommendations: {
                [state.currentPage]: {
                    $set: state.recommendations[state.currentPage].filter((recommendation) => {
                        return recommendation.id !== action.recommendation.id
                    })
                }
            }
        })
    },
    [actionType.REMOVE_HOME_RECOMMENDATION_ERROR](state, action) {
        return state
    },

    // 更新首页推荐用户的背景图片
    [actionType.UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_START](state, action){
        return state
    },
    [actionType.UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_SUCCESS](state, action) {
        return update(state, {
            recommendations: {
                [state.currentPage]: {
                    $set: state.recommendations[state.currentPage].map((recommendation) => {
                        return recommendation.id === action.recommendation.id ? action.recommendation : recommendation
                    })
                }
            }
        })
    },
    [actionType.UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_ERROR](state, action){
        return state
    },

    // 添加首页推荐
    [actionType.ADD_HOME_RECOMMENDATION_START](state, action) {
        return state
    },
    [actionType.ADD_HOME_RECOMMENDATION_SUCCESS](state, action) {
        let newState = update(state, {
            currentPage: {$set: 1},
            recommendations: {
                [state.currentPage]: {
                    $set: state.recommendations[state.currentPage].filter((recommendation) => {
                        return recommendation.id !== action.recommendation.id
                    })
                }
            }
        })

        return update(newState, {
            recommendations: {1: {$unshift: [action.recommendation]}}
        })
    },
    [actionType.ADD_HOME_RECOMMENDATION_ERROR](state, action) {
        return state
    },

    // 置顶首页推荐
    [actionType.TOP_HOME_RECOMMENDATION_START](state, action) {
        return state
    },
    [actionType.TOP_HOME_RECOMMENDATION_SUCCESS](state, action) {
        let newState = update(state, {
            currentPage: {$set: 1},
            recommendations: {
                [state.currentPage]: {
                    $set: state.recommendations[state.currentPage].filter((recommendation) => {
                        return recommendation.id !== action.recommendation.id
                    })
                }
            }
        })

        return update(newState, {
            recommendations: {1: {$unshift: [action.recommendation]}}
        })
    },
    [actionType.TOP_HOME_RECOMMENDATION_ERROR](state, action) {
        return state
    },
})
