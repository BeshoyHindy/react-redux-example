import { Question } from '../models'

/**
 * 获取全部提问
 */

export const FETCH_QUESTIONS_START = "FETCH_QUESTIONS_START"
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS"
export const FETCH_QUESTIONS_ERROR = "FETCH_QUESTIONS_ERROR"

export function fetchQuestionsStart() {
    return {type: FETCH_QUESTIONS_START}
}

export function fetchQuestionsSuccess(questions, page, totalCount) {
    return {type: FETCH_QUESTIONS_SUCCESS, questions, page, totalCount}
}

export function fetchQuestionsError(error) {
    return {type: FETCH_QUESTIONS_ERROR, error}
}

export function fetchQuestions(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchQuestionsStart())

        Question.fetchAll(page, perPage).then(function (questions, totalCount) {
            dispatch(fetchQuestionsSuccess(questions, page, totalCount))
        }, function (error) {
            dispatch(fetchQuestionsError(error))
        })
    }
}

/**
 * 获取匿名提问
 */

export const FETCH_PENDING_ANONYMOUS_QUESTIONS_START = "FETCH_PENDING_ANONYMOUS_QUESTIONS_START"
export const FETCH_PENDING_ANONYMOUS_QUESTIONS_SUCCESS = "FETCH_PENDING_ANONYMOUS_QUESTIONS_SUCCESS"
export const FETCH_PENDING_ANONYMOUS_QUESTIONS_ERROR = "FETCH_PENDING_ANONYMOUS_QUESTIONS_ERROR"

export function fetchPendingAnonymousQuestionsStart() {
    return {type: FETCH_PENDING_ANONYMOUS_QUESTIONS_START}
}

export function fetchPendingAnonymousQuestionsSuccess(questions, page, totalCount) {
    return {type: FETCH_PENDING_ANONYMOUS_QUESTIONS_SUCCESS, questions, page, totalCount}
}

export function fetchPendingAnonymousQuestionsError(error) {
    return {type: FETCH_PENDING_ANONYMOUS_QUESTIONS_ERROR, error}
}

export function fetchPendingAnonymousQuestions(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchPendingAnonymousQuestionsStart())

        Question.fetchPendingAnonymousQuestions(page, perPage).then(function (questions, totalCount) {
            dispatch(fetchPendingAnonymousQuestionsSuccess(questions, page, totalCount))
        }, function (error) {
            dispatch(fetchPendingAnonymousQuestionsError(error))
        })
    }
}

/**
 * 获取全部回答
 */

export const FETCH_ANSWERS_START = "FETCH_ANSWERS_START"
export const FETCH_ANSWERS_SUCCESS = "FETCH_ANSWERS_SUCCESS"
export const FETCH_ANSWERS_ERROR = "FETCH_ANSWERS_ERROR"

export function fetchAnswersStart() {
    return {type: FETCH_ANSWERS_START}
}

export function fetchAnswersSuccess(answers, page, totalCount) {
    return {type: FETCH_ANSWERS_SUCCESS, answers, page, totalCount}
}

export function fetchAnswersError(error) {
    return {type: FETCH_ANSWERS_ERROR, error}
}

export function fetchAnswers(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchAnswersStart())

        Question.fetchAnswers(page, perPage).then(function (answers, totalCount) {
            dispatch(fetchAnswersSuccess(answers, page, totalCount))
        }, function (error) {
            dispatch(fetchAnswersError(error))
        })
    }
}

/**
 * 更新问题
 */

export const UPDATE_QUESTION_START = "UPDATE_QUESTION_START"
export const UPDATE_QUESTION_SUCCESS = "UPDATE_QUESTION_SUCCESS"
export const UPDATE_QUESTION_ERROR = "UPDATE_QUESTION_ERROR"

export function updateQuestionStart() {
    return {type: UPDATE_QUESTION_START}
}

export function updateQuestionSuccess(question) {
    return {type: UPDATE_QUESTION_SUCCESS, question}
}

export function updateQuestionError(error) {
    return {type: UPDATE_QUESTION_ERROR, error}
}

export function updateQuestion(question, title) {
    return dispatch => {
        dispatch(updateQuestionStart())

        question.update(title).then(function (question) {
            dispatch(updateQuestionSuccess(question))
        }, function (error) {
            dispatch(updateQuestionError(error))
        })
    }
}

/**
 * 删除问题
 */

export const DELETE_QUESTION_START = "DELETE_QUESTION_START"
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS"
export const DELETE_QUESTION_ERROR = "DELETE_QUESTION_ERROR"

export function deleteQuestionStart() {
    return {type: DELETE_QUESTION_START}
}

export function deleteQuestionSuccess(question) {
    return {type: DELETE_QUESTION_SUCCESS, question}
}

export function deleteQuestionError(error) {
    return {type: DELETE_QUESTION_ERROR, error}
}

export function deleteQuestion(question) {
    return dispatch => {
        dispatch(deleteQuestionStart())

        question.destroy().then(function () {
            dispatch(deleteQuestionSuccess(question))
        }, function (error) {
            dispatch(deleteQuestionError(error))
        })
    }
}



