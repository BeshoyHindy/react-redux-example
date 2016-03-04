import React from 'react'
import Radium from 'radium'
import Modal from "react-modal"
import BaseModal from "../public/BaseFormModal"

@Radium
export default class UserModal extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        modalIsOpen: React.PropTypes.bool.isRequired,
        updateUser: React.PropTypes.func.isRequired,
        closeModal: React.PropTypes.func.isRequired
    }

    state = {
        name: "",
        title: "",
        achievements: "",
        desc: "",
        mobilePhoneNumber: "",
        tags: ""
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.user && nextProps.modalIsOpen) {
            this.setState({
                name: nextProps.user.get('name'),
                title: nextProps.user.get('title'),
                achievements: nextProps.user.get('achievements'),
                desc: nextProps.user.get('desc'),
                mobilePhoneNumber: nextProps.user.get('mobilePhoneNumber'),
                tags: nextProps.user.get('tags').join(', ')
            })
        }
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }

    handleDescChange = (e) => {
        this.setState({desc: e.target.value})
    }

    handleAchievementsChange = (e) => {
        this.setState({achievements: e.target.value})
    }

    handleMobilePhoneNumberChange = (e) => {
        this.setState({mobilePhoneNumber: e.target.value})
    }

    handleTagsChange = (e) => {
        this.setState({tags: e.target.value})
    }

    handleSubmit = () => {
        const { user, updateUser, closeModal } = this.props
        const tags = this.state.tags.replace(/ /g, '').split(',')

        closeModal()
        updateUser(user, this.state.name, this.state.title, this.state.achievements, this.state.desc,
            this.state.mobilePhoneNumber, tags)
    }

    render() {
        const { modalIsOpen, closeModal } = this.props

        return (
            <BaseModal
                title={"编辑用户：" + this.state.name}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                handleSubmit={this.handleSubmit}>
                <form>
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" className="form-control" value={this.state.name}
                               onChange={this.handleNameChange}/>
                    </div>
                    <div className="form-group">
                        <label>身份</label>
                        <input type="text" className="form-control" value={this.state.title}
                               onChange={this.handleTitleChange}/>
                    </div>
                    <div className="form-group">
                        <label>手机号</label>
                        <input type="text" className="form-control" value={this.state.mobilePhoneNumber}
                               onChange={this.handleMobilePhoneNumberChange}/>
                    </div>
                    <div className="form-group">
                        <label>标签</label>
                        <input type="text" className="form-control" value={this.state.tags}
                               onChange={this.handleTagsChange}/>
                        <p className="help-block">注：使用英文标点 <strong>,</strong> 分隔标签</p>
                    </div>
                    <div className="form-group">
                        <label>成就</label>
                                <textarea className="form-control" rows="2" value={this.state.achievements}
                                          onChange={this.handleAchievementsChange}/>
                    </div>
                    <div className="form-group">
                        <label>简介</label>
                                <textarea className="form-control" rows="3" value={this.state.desc}
                                          onChange={this.handleDescChange}/>
                    </div>
                </form>
            </BaseModal>
        )
    }
}

const styles = {}
