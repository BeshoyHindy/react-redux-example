import AV from 'avoscloud-sdk'
import UserTagAssociation from './UserTagAssociation'
import Question from './Question'

const User = AV.User

/**
 * Class Methods
 */

User.fetchTodayUsersCount = function () {
    const query = new AV.Query(User)
    const now = new Date()

    now.setHours(0, 0, 0, 0)
    query.greaterThan('createdAt', now)

    return query.count()
}

User.askAnonymousQuestion = function (targetUser, title) {
    const question = new Question()

    question.fetchWhenSave(true)
    question.set('user', targetUser)
    question.set('anonymous', true)
    question.set('title', title)

    return question.save()
}

User.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(User)
    const countQuery = new AV.Query(User)

    query.addDescending('createdAt')
    query.skip(perPage * (page - 1))
    query.limit(perPage)

    return AV.Promise.when(query.find(), countQuery.count())
}

User.searchByName = function (name, page = 1, perPage = 15) {
    const query = new AV.Query(User)
    const countQuery = new AV.Query(User)

    query.contains('name', name)
    query.skip(perPage * (page - 1))
    query.limit(perPage)

    countQuery.contains('name', name)

    return AV.Promise.when(query.find(), countQuery.count())
}

User.searchOpenedUserByName = function (name, page = 1, perPage = 15) {
    const query = new AV.Query(User)
    const countQuery = new AV.Query(User)

    query.contains('name', name)
    query.equalTo('opened', true)
    query.skip(perPage * (page - 1))
    query.limit(perPage)

    countQuery.contains('name', name)
    countQuery.equalTo('opened', true)

    return AV.Promise.when(query.find(), countQuery.count())
}

/**
 * Instance Methods
 */

Object.assign(User.prototype, {
    fetchQuestionsByLikesCount(page = 1, perPage = 15) {
        const query = new AV.Query(Question)

        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.equalTo('user', this)
        query.equalTo('answered', true)
        query.include('asker')
        query.include('user')
        query.addDescending('likesCount')

        return query.find()
    },

    fetchQuestionsByTime(page = 1, perPage = 15) {
        const query = new AV.Query(Question)

        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.equalTo('user', this)
        query.equalTo('answered', true)
        query.include('asker')
        query.include('user')
        query.addDescending('createdAt')

        return query.find()
    },

    fetchPendingQuestions(page = 1, perPage = 15) {
        const query = new AV.Query(Question)

        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.equalTo('user', this)
        query.equalTo('answered', false)
        query.include('asker')
        query.include('user')
        query.addDescending('createdAt')

        return query.find()
    },

    fetchDrafts(page = 1, perPage = 15){
        const query = new AV.Query(Question)

        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.equalTo('user', this)
        query.equalTo('drafted', true)
        query.include('asker')
        query.include('user')
        query.addDescending('draftedAt')

        return query.find()
    },

    fetchAskedQuestions(page = 1, perPage = 15){
        const query = new AV.Query(Question)

        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.equalTo('asker', this)
        query.include('asker')
        query.include('user')
        query.addDescending('createdAt')

        return query.find()
    },

    openQAPage() {
        this.set('authed', true)
        this.set('opened', true)
        this.set('processingQARequest', false)

        return this.save()
    },

    closeQAPage() {
        this.set('authed', false)
        this.set('opened', false)
        this.set('processingQARequest', false)

        return this.save()
    },

    update(name, title, achievements, desc, mobilePhoneNumber, tags){
        // 删除该用户的 userTagAssociations
        const query = new AV.Query(UserTagAssociation)
        query.equalTo('user', this)
        query.destroyAll()

        this.set('name', name)
        this.set('title', title)
        this.set('achievements', achievements)
        this.set('desc', desc)
        this.set('mobilePhoneNumber', mobilePhoneNumber)
        this.set('tags', tags)

        return this.save().then(function (user) {
            // 新建 userTagAssociations
            AV.Object.saveAll(tags.map((tag) => {
                const userTagAssociation = new UserTagAssociation()
                userTagAssociation.set('tag', tag)
                userTagAssociation.set('user', user)
                return userTagAssociation
            }))

            return user
        })
    }
})

export default User
