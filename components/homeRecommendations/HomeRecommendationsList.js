import React from 'react'
import Radium from 'radium'
import { friendlyTimeWithLineBreak } from '../../filters'
import UserHomeRecommendation from './UserHomeRecommendation'

@Radium
export default class HomeRecommendationsList extends React.Component {
    static propTypes = {
        homeRecommendations: React.PropTypes.array.isRequired,
        removeHomeRecommendation: React.PropTypes.func.isRequired,
        selectImageFile: React.PropTypes.func.isRequired,
        topHomeRecommendation: React.PropTypes.func.isRequired
    }

    removeHomeRecommendation = (homeRecommendation) => {
        const { removeHomeRecommendation } = this.props

        if (window.confirm('确认删除该首页推荐?')) {
            removeHomeRecommendation(homeRecommendation)
        }
    }

    render() {
        const { homeRecommendations, selectImageFile, topHomeRecommendation } = this.props
        const rows = homeRecommendations.map(homeRecommendation => {
            let homeRecommendationNode = null

            if (homeRecommendation.get('kind') === 'user') {
                homeRecommendationNode = (<UserHomeRecommendation homeRecommendation={homeRecommendation}/>)
            }

            return (
                <tr key={homeRecommendation.id}>
                    <td style={styles.kindCell}>{generateKindString(homeRecommendation.get('kind'))}</td>
                    <td style={styles.userCell}>{homeRecommendationNode}</td>
                    <td style={styles.timeCell}>{friendlyTimeWithLineBreak(homeRecommendation.createdAt)}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-default"
                                    onClick={() => this.removeHomeRecommendation(homeRecommendation)}>移除
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={() => selectImageFile(homeRecommendation)}>上传图片
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={() => topHomeRecommendation(homeRecommendation)}>置顶
                            </button>

                            {/*<button type="button" key={"reorder" + homeRecommendation.id} className="btn btn-default"
                                    style={styles.reorder}>
                                <i className="fa fa-reorder"/>
                            </button>*/}
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>类型</th>
                    <th>推荐对象</th>
                    <th>推荐于</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

function generateKindString(kind) {
    switch (kind) {
        case "user":
            return "用户"
        default:
            return ""
    }
}

const styles = {
    kindCell: {
        minWidth: '100px'
    },
    userCell: {
        paddingBottom: '12px'
    },
    timeCell: {
        minWidth: '100px'
    },
    reorder: {
        ':hover': {
            cursor: "move"
        }
    }
}