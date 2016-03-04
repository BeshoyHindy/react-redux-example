import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'
import { fetchInvitationCodes, markInvitationSended, generateInvitationCodes } from '../actions/invitationCodes'
import Pagination from '../components/public/Pagination'
import InvitationCodesList from '../components/invitationCodes/InvitationCodesList'
import MarkInvitationCodeSendedModal from '../components/invitationCodes/MarkInvitationCodeSendedModal'

const perPage = 15

@Radium
export default class InvitationCodesPage extends React.Component {
    state = {
        modalIsOpen: false,
        codeForModal: null
    }

    openModal = (code) => {
        this.setState({modalIsOpen: true, codeForModal: code})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchInvitationCodes(this.props.currentPage, perPage))
    }

    handleGenerateCodes = () => {
        const { dispatch } = this.props

        dispatch(generateInvitationCodes())
    }

    render() {
        const { dispatch } = this.props

        return (
            <div>
                <h3>邀请码管理</h3>

                <div className="btn-group">
                    <button type="button" className="btn btn-default"
                            onClick={this.handleGenerateCodes}>
                        <span className="fa fa-plus"/> 生成 5 个邀请码
                    </button>
                </div>

                <div style={styles.invitationCodeList}>
                    <InvitationCodesList
                        invitationCodes={this.props.codes}
                        openModal={this.openModal}/>
                </div>

                <MarkInvitationCodeSendedModal
                    code={this.state.codeForModal}
                    closeModal={this.closeModal}
                    modalIsOpen={this.state.modalIsOpen}
                    markSended={bindActionCreators(markInvitationSended, dispatch)}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchInvitationCodes(page, perPage), dispatch)}
                    perPage={perPage}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCount: state.invitationCodes.totalCount,
        currentPage: state.invitationCodes.currentPage,
        codes: state.invitationCodes.codes[state.invitationCodes.currentPage] || []
    }
}

const styles = {
    invitationCodeList: {
        marginTop: '10px'
    }
}

export default connect(mapStateToProps)(InvitationCodesPage)
