import React from 'react'
import Radium from 'radium'
import _ from 'lodash'

@Radium
export default class Pagination extends React.Component {
    static defaultProps = {
        currentPage: 1,
        perPage: 15,
        size: 'md'
    }

    static propTypes = {
        totalCount: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        perPage: React.PropTypes.number,
        redirect: React.PropTypes.func.isRequired,
        size: React.PropTypes.oneOf(['sm', 'md', 'lg'])
    }

    get totalPage() {
        const { totalCount, perPage } = this.props

        return Math.ceil(totalCount / perPage)
    }

    redirectToOtherPage = (page) => {
        const { redirect, currentPage } = this.props

        if (page < 1 || page > this.totalPage || page === currentPage) {
            return
        }

        redirect(page)
    }

    render() {
        const { redirect, totalCount, currentPage, perPage } = this.props
        const totalPage = Math.ceil(totalCount / perPage)
        const sizeClassName = this.props.size === 'md' ? '' : `pagination-${this.props.size}`
        const pageNumbers = _.range(1, totalPage + 1).map(function (pageNumber) {
            return (
                <li key={pageNumber} className={pageNumber === currentPage ? "active" : null}>
                    <a href="javascript: void(0)" onClick={() => this.redirectToOtherPage(pageNumber)}>
                        <span>{pageNumber}</span>
                    </a>
                </li>
            )
        }.bind(this))

        return (
            <nav>
                <ul className={`pagination ${sizeClassName}`}>
                    <li className={this.props.currentPage === 1 ? "disabled" : null}>
                        <a href="javascript: void(0)"
                           onClick={() => this.redirectToOtherPage(this.props.currentPage - 1)}>
                            <span>&laquo;</span>
                        </a>
                    </li>
                    {pageNumbers}
                    <li className={this.props.currentPage >= this.totalPage ? "disabled" : null}>
                        <a href="javascript: void(0)"
                           onClick={() => this.redirectToOtherPage(this.props.currentPage + 1)}>
                            <span>&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

const styles = {}
