import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'
import { fetchHomeRecommendations, removeHomeRecommendation,
    updateHomeRecommendationUserBackgroundImage, addHomeRecommendation, topHomeRecommendation } from '../actions/homeRecommendations'
import Pagination from '../components/public/Pagination'
import HomeRecommendationsList from '../components/homeRecommendations/HomeRecommendationsList'
import AddHomeRecommendationModal from '../components/homeRecommendations/AddHomeRecommendationModal'

const perPage = 15

@Radium
export default class HomeRecommendationsPage extends React.Component {
    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({modalIsOpen: true})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchHomeRecommendations(1, perPage))
    }

    selectImageFile = (homeRecommendation) => {
        this.targetHomeRecommendation = homeRecommendation

        if (this.fileInput !== null) {
            this.fileInput.click();
        }
    }

    handleInputChange = (e) => {
        const { dispatch } = this.props

        dispatch(updateHomeRecommendationUserBackgroundImage(this.targetHomeRecommendation, e.target.files[0]))
    }

    render() {
        const { dispatch, recommendations } = this.props

        return (
            <div>
                <h3>首页推荐管理</h3>

                <div className="btn-group">
                    <button type="button" className="btn btn-default" onClick={this.openModal}>
                        <span className="fa fa-plus"/> 添加推荐
                    </button>
                </div>

                <div style={styles.homeRecommendationList}>
                    <HomeRecommendationsList
                        homeRecommendations={recommendations}
                        removeHomeRecommendation={bindActionCreators(removeHomeRecommendation, dispatch)}
                        selectImageFile={this.selectImageFile}
                        topHomeRecommendation={bindActionCreators(topHomeRecommendation, dispatch)}/>
                </div>

                <input type="file" accept="image/*" style={{display: "none"}} ref={(ref) => this.fileInput = ref}
                       onChange={this.handleInputChange}/>

                <AddHomeRecommendationModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    addHomeRecommendation={bindActionCreators(addHomeRecommendation, dispatch)}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchHomeRecommendations(page, perPage), dispatch)}
                    perPage={perPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalCount: state.homeRecommendations.totalCount,
        currentPage: state.homeRecommendations.currentPage,
        recommendations: state.homeRecommendations.recommendations[state.homeRecommendations.currentPage] || []
    }
}

const styles = {
    homeRecommendationList: {
        marginTop: '10px'
    }
}


export default connect(mapStateToProps)(HomeRecommendationsPage)
