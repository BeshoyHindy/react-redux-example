import { HomeRecommendation } from '../models'

/**
 * 获取首页推荐
 */

export const FETCH_HOME_RECOMMENDATIONS_START = "FETCH_HOME_RECOMMENDATIONS_START"
export const FETCH_HOME_RECOMMENDATIONS_SUCCESS = "FETCH_HOME_RECOMMENDATIONS_SUCCESS"
export const FETCH_HOME_RECOMMENDATIONS_ERROR = "FETCH_HOME_RECOMMENDATIONS_ERROR"

export function fetchHomeRecommendationsStart() {
    return {type: FETCH_HOME_RECOMMENDATIONS_START}
}

export function fetchHomeRecommendationsSuccess(recommendations, page, totalCount) {
    return {type: FETCH_HOME_RECOMMENDATIONS_SUCCESS, recommendations, page, totalCount}
}

export function fetchHomeRecommendationsError(error) {
    return {type: FETCH_HOME_RECOMMENDATIONS_ERROR, error}
}

export function fetchHomeRecommendations(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchHomeRecommendationsStart())

        HomeRecommendation.fetchAll(page, perPage).then(function (recommendations, totalCount) {
            dispatch(fetchHomeRecommendationsSuccess(recommendations, page, totalCount))
        }, function (error) {
            dispatch(fetchHomeRecommendationsError(error))
        })
    }
}

/**
 * 移除首页推荐
 */

export const REMOVE_HOME_RECOMMENDATION_START = "REMOVE_HOME_RECOMMENDATION_START"
export const REMOVE_HOME_RECOMMENDATION_SUCCESS = "REMOVE_HOME_RECOMMENDATION_SUCCESS"
export const REMOVE_HOME_RECOMMENDATION_ERROR = "REMOVE_HOME_RECOMMENDATION_ERROR"

export function removeHomeRecommendationStart() {
    return {type: REMOVE_HOME_RECOMMENDATION_START}
}

export function removeHomeRecommendationSuccess(recommendation) {
    return {type: REMOVE_HOME_RECOMMENDATION_SUCCESS, recommendation}
}

export function removeHomeRecommendationError(error) {
    return {type: REMOVE_HOME_RECOMMENDATION_ERROR, error}
}

export function removeHomeRecommendation(recommendation) {
    return dispatch => {
        dispatch(removeHomeRecommendationStart())

        recommendation.destroy().then(function () {
            dispatch(removeHomeRecommendationSuccess(recommendation))
        }, function (error) {
            dispatch(removeHomeRecommendationError(error))
        })
    }
}

/**
 * 更换首页推荐用户的背景图片
 */

export const UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_START = "UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_START"
export const UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_SUCCESS = "UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_SUCCESS"
export const UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_ERROR = "UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_ERROR"

export function updateHomeRecommendationUserBackgroundImageStart() {
    return {type: UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_START}
}

export function updateHomeRecommendationUserBackgroundImageSuccess(recommendation) {
    return {type: UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_SUCCESS, recommendation}
}

export function updateHomeRecommendationUserBackgroundImageError(error) {
    return {type: UPDATE_HOME_RECOMMENDATION_USER_BACKGROUND_IMAGE_ERROR, error}
}

export function updateHomeRecommendationUserBackgroundImage(recommendation, file) {
    return dispatch => {
        dispatch(updateHomeRecommendationUserBackgroundImageStart())

        recommendation.updateUserBackgroundImage(file).then(function () {
            dispatch(updateHomeRecommendationUserBackgroundImageSuccess(recommendation))
        }, function (error) {
            dispatch(updateHomeRecommendationUserBackgroundImageError(error))
        })
    }
}

/**
 * 添加首页推荐
 */

export const ADD_HOME_RECOMMENDATION_START = "ADD_HOME_RECOMMENDATION_START"
export const ADD_HOME_RECOMMENDATION_SUCCESS = "ADD_HOME_RECOMMENDATION_SUCCESS"
export const ADD_HOME_RECOMMENDATION_ERROR = "ADD_HOME_RECOMMENDATION_ERROR"

export function addHomeRecommendationStart() {
    return {type: ADD_HOME_RECOMMENDATION_START}
}

export function addHomeRecommendationSuccess(recommendation) {
    return {type: ADD_HOME_RECOMMENDATION_SUCCESS, recommendation}
}

export function addHomeRecommendationError(error) {
    return {type: ADD_HOME_RECOMMENDATION_ERROR, error}
}

export function addHomeRecommendation(kind, object) {
    return dispatch => {
        dispatch(addHomeRecommendationStart())

        HomeRecommendation.add(kind, object).then(function (recommendation) {
            dispatch(addHomeRecommendationSuccess(recommendation))
        }, function (error) {
            dispatch(addHomeRecommendationError(error))
        })
    }
}

/**
 * 置顶首页推荐对象
 */

export const TOP_HOME_RECOMMENDATION_START = "TOP_HOME_RECOMMENDATION_START"
export const TOP_HOME_RECOMMENDATION_SUCCESS = "TOP_HOME_RECOMMENDATION_SUCCESS"
export const TOP_HOME_RECOMMENDATION_ERROR = "TOP_HOME_RECOMMENDATION_ERROR"

export function topHomeRecommendationStart() {
    return {type: TOP_HOME_RECOMMENDATION_START}
}

export function topHomeRecommendationSuccess(recommendation) {
    return {type: TOP_HOME_RECOMMENDATION_SUCCESS, recommendation}
}

export function topHomeRecommendationError(error) {
    return {type: TOP_HOME_RECOMMENDATION_ERROR, error}
}

export function topHomeRecommendation(recommendation) {
    return dispatch => {
        dispatch(topHomeRecommendationStart())

        recommendation.top().then(function (recommendation) {
            dispatch(topHomeRecommendationSuccess(recommendation))
        }, function (error) {
            dispatch(topHomeRecommendationError(error))
        })
    }
}
