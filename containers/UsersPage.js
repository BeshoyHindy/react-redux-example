import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pagination from '../components/public/Pagination'
import UsersList from '../components/users/UsersList'
import UserModal from '../components/users/UserModal'
import { fetchUsers, openUserQAPage, closeUserQAPage, updateUser, searchUsers } from '../actions/users'

const perPage = 15

@Radium
export default class UsersPage extends Component {
    state = {
        modalIsOpen: false,
        userForModal: null,
        searchKeyword: ""
    }

    openModal = (user) => {
        this.setState({modalIsOpen: true, userForModal: user})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchUsers(1, perPage))
    }

    handleKeywordChange = (e) => {
        const { dispatch } = this.props
        const keyword = e.target.value.trim()

        this.setState({searchKeyword: keyword})

        if (keyword === "") {
            dispatch(fetchUsers(1, perPage))
        }
    }

    handleSearch = () => {
        const { dispatch } = this.props

        if (this.state.searchKeyword === "") {
            dispatch(fetchUsers(1, perPage))
        } else {
            dispatch(searchUsers(this.state.searchKeyword))
        }
    }

    render() {
        const { dispatch } = this.props

        return (
            <div>
                <h3>用户管理</h3>

                <div className="input-group" style={styles.searchWap}>
                    <input type="text" className="form-control" placeholder="搜索用户" value={this.state.searchKeyword}
                           onChange={this.handleKeywordChange}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.handleSearch}>
                            <i className="fa fa-search"/>
                        </button>
                    </span>
                </div>

                <UsersList users={this.props.users}
                           openModal={this.openModal}
                           openUserQAPage={bindActionCreators(openUserQAPage, dispatch)}
                           closeUserQAPage={bindActionCreators(closeUserQAPage, dispatch)}/>

                <UserModal user={this.state.userForModal}
                           modalIsOpen={this.state.modalIsOpen}
                           updateUser={bindActionCreators(updateUser, dispatch)}
                           closeModal={this.closeModal}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchUsers(page, perPage), dispatch)}
                    perPage={perPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        currentPage: state.users.currentPage,
        totalCount: state.users.totalCount
    }
}

const styles = {
    searchWap: {
        maxWidth: "500px",
        marginBottom: "10px"
    }
}

export default connect(mapStateToProps)(UsersPage)
