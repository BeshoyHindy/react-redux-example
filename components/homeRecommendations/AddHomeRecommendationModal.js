import React from 'react'
import Radium from 'radium'
import BaseModal from '../public/BaseFormModal'
import UserSelector from './UserSelector'
import { User } from '../../models'

@Radium
export default class AddHomeRecommendationModal extends React.Component {
    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        addHomeRecommendation: React.PropTypes.func.isRequired,
        modalIsOpen: React.PropTypes.bool.isRequired
    }

    state = {
        searchUsers: [],
        targetHomeRecommendation: null
    }

    handleSearch = () => {
        const searchWord = this.refs.searchWord.value.trim()

        if (searchWord === "") {
            this.setState({searchUsers: []})
        } else {
            User.searchOpenedUserByName(searchWord).then(function (users) {
                this.setState({searchUsers: users})
            }.bind(this))
        }
    }

    selectUser = (user) => {
        this.refs.searchWord.value = ""
        this.setState({
            searchUsers: [],
            targetHomeRecommendation: user
        })
    }

    handleSubmit = () => {
        const { addHomeRecommendation } = this.props

        if (!this.state.targetHomeRecommendation) {
            window.alert("请选择推荐对象")
            return
        }

        this.closeModal()
        addHomeRecommendation("user", this.state.targetHomeRecommendation)
    }

    closeModal = ()=> {
        const { closeModal } = this.props

        this.refs.searchWord.value = ""

        this.setState({
            searchUsers: [],
            targetHomeRecommendation: null
        })

        closeModal()
    }

    render() {
        const { closeModal, modalIsOpen } = this.props

        return (
            <BaseModal
                title="添加首页推荐"
                closeModal={this.closeModal}
                modalIsOpen={modalIsOpen}
                handleSubmit={this.handleSubmit}>
                <form>
                    <div className="form-group">
                        <label>搜索</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="输入用户名进行搜索" ref="searchWord"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.handleSearch}>
                                    <i className="fa fa-search"/>
                                </button>
                            </span>
                        </div>
                    </div>

                    <UserSelector
                        users={this.state.searchUsers}
                        selectUser={this.selectUser}/>

                    <div className="form-group">
                        <label>推荐对象</label>
                        <p className="form-control-static">
                            {this.state.targetHomeRecommendation
                                ? "用户 - " + this.state.targetHomeRecommendation.get('name')
                                : "无"}</p>
                    </div>
                </form>
            </BaseModal>
        )
    }
}

const styles = {}
