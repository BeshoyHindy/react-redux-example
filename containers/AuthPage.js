import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'
import * as auth from '../auth'
import { logIn } from '../actions/account'

@Radium
export default class AuthPage extends React.Component {
    state = {
        password: ""
    }

    componentDidMount() {
        this.refs.password.focus()
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value.trim()})
    }

    handleSubmit = (e) => {
        const { dispatch } = this.props

        e.preventDefault()
        dispatch(logIn(this.state.password))
        this.setState({password: ""})
    }

    render() {
        const { dispatch } = this.props

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3 className="text-center">谁？</h3>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" rows="3" ref="password" value={this.state.password}
                                   onChange={this.handlePasswordChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">敲门</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const styles = {}

export default connect(mapStateToProps)(AuthPage)
