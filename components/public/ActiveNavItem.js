import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'

@Radium
export default class ActiveNavItem extends React.Component {
    static propTypes = {
        path: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        currentPath: React.PropTypes.string.isRequired
    }

    render() {
        return (
            <li className={this.props.path === this.props.currentPath ? 'active': null}>
                <Link to={this.props.path}>{this.props.text}</Link>
            </li>
        )
    }
}

const styles = {}
