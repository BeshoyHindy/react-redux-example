import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import update from 'react-addons-update'
import Radium from 'radium'
import AV from 'avoscloud-sdk'
import { User } from '../models'
import UserPageHeader from '../components/users/UserPageHeader'
import UserTabs from '../components/users/UserTabs'
import AskQuestionModal from '../components/question/AskQuestionModal'

@Radium
export default class UserPage extends React.Component {
    state = {
        user: null,
        askQuestionModalIsOpen: false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.fetchData(nextProps.params.id)
        }
    }

    componentDidMount() {
        this.fetchData(this.props.params.id)
    }


    askQuestion = (title) => {
        User.askAnonymousQuestion(this.state.user, title).then(function (question) {
            this.setState({
                user: update(this.state.user, {
                    attributes: {pendingQuestionsCount: {$apply: count => count + 1}}
                }),
                pendingQuestions: update(this.state.pendingQuestions, {$unshift: [question]})
            })
        }.bind(this))
    }

    fetchData = (id) => {
        const user = AV.Object.createWithoutData('_User', id)

        user.fetch().then(function (user) {
            this.setState({user: user})
        }.bind(this))
    }

    openAskQuestionModal = () => {
        this.setState({askQuestionModalIsOpen: true})
    }

    closeAskQuestionModal = () => {
        this.setState({askQuestionModalIsOpen: false})
    }

    render() {
        const { user } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        {user ? <UserPageHeader user={this.state.user}/> : null}
                    </div>

                    <div className="col-md-4">
                        <div className="btn-group pull-right">
                            {/*
                             <button type="button" className="btn btn-default">
                             编辑
                             </button>
                             {user && !user.get('opened') ?
                             <button type="button" className="btn btn-default">
                             开通
                             </button> : null}
                             */}
                            {user && user.get('opened') ?
                                <button type="button" className="btn btn-default"
                                        onClick={this.openAskQuestionModal}>提问
                                </button> : null}
                        </div>
                    </div>
                </div>

                <div style={styles.tabs}>
                    {user ? <UserTabs user={user}/> : null}
                </div>

                <AskQuestionModal
                    closeModal={this.closeAskQuestionModal}
                    modalIsOpen={this.state.askQuestionModalIsOpen}
                    askQuestion={this.askQuestion}/>
            </div>
        )
    }
}

//const mapStateToProps = (state) => {
//    return {}
//}

const styles = {
    header: {
        marginBottom: '15px'
    },
    name: {
        marginTop: '4px'
    },
    statusLabel: {
        marginLeft: '10px',
        fontSize: '12px'
    },
    desc: {
        marginBottom: '15px'
    },
    tabs: {
        marginTop: '10px'
    }
}

export default UserPage
//export default connect(mapStateToProps)(UserPage)
