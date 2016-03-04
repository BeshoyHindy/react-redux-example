import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class VisitorQuestionsReviewPage extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props

    }

    render() {
        const { dispatch } = this.props

        return (
            <div>
                <h3>匿名提问审核</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: []
    }
}

export default connect(mapStateToProps)(VisitorQuestionsReviewPage)
