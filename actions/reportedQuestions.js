import { ReportQuestion } from '../models'

/**
 * 获取举报内容
 */

export const FETCH_REPORTED_QUESTIONS_START = "FETCH_REPORTED_QUESTIONS_START"
export const FETCH_REPORTED_QUESTIONS_SUCCESS = "FETCH_REPORTED_QUESTIONS_SUCCESS"
export const FETCH_REPORTED_QUESTIONS_ERROR = "FETCH_REPORTED_QUESTIONS_ERROR"

export function fetchReportedQuestionsStart() {
    return {type: FETCH_REPORTED_QUESTIONS_START}
}

export function fetchReportedQuestionsSuccess(questions, page, totalCount) {
    return {type: FETCH_REPORTED_QUESTIONS_SUCCESS, questions, page, totalCount}
}

export function fetchReportedQuestionsError(error) {
    return {type: FETCH_REPORTED_QUESTIONS_ERROR, error}
}

export function fetchReportedQuestions(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchReportedQuestionsStart())

        ReportQuestion.fetchAll(page, perPage).then(function (reportedQuestions, totalCount) {
            dispatch(fetchReportedQuestionsSuccess(reportedQuestions, page, totalCount))
        }, function (error) {
            dispatch(fetchReportedQuestionsError(error))
        })
    }
}
