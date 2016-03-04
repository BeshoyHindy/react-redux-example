import React from 'react'
import Radium from 'radium'
import { browserHistory } from 'react-router'

@Radium
export default class UserHomeRecommendation extends React.Component {
    static propTypes = {
        homeRecommendation: React.PropTypes.object.isRequired
    }

    render() {
        const { homeRecommendation } = this.props
        const user = homeRecommendation.get('user')
        const backgroundImageUrl = user.get('userCardBackgroundImage')
            ? user.get('userCardBackgroundImage').url()
            : user.get('avatar').url()

        return (
            <div>
                <div style={styles.achievements}>{user.get('achievements')}</div>
                <div onClick={() => browserHistory.push(`/user/${user.id}`)}
                    style={[
                        {backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(' + backgroundImageUrl + ')'},
                        styles.backgroundImageWap
                    ]}>
                    <div style={styles.nameTitleWap}>
                        <div style={styles.name}>{user.get('name')}</div>
                        <div style={styles.title}>{user.get('title')}</div>
                    </div>
                </div>
                <div style={styles.bottomWap}>
                    <span style={styles.tags}>{user.get('tags').join(', ')}</span>
                    <span style={styles.answeredQuestionsCount}>{user.get('answeredQuestionsCount')} 问答</span>
                </div>
            </div>
        )
    }
}

const styles = {
    achievements: {
        fontWeight: 'bold'
    },
    backgroundImageWap: {
        marginTop: '5px',
        width: '250px',
        height: '125px',
        color: 'white',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        ':hover': {
            cursor: 'pointer'
        }
    },
    nameTitleWap: {
        position: 'absolute',
        bottom: '10px',
        left: '12px'
    },
    name: {
        fontWeight: '1000',
        fontSize: '15px'
    },
    title: {
        fontSize: '12px',
        marginTop: '3px'
    },
    bottomWap: {
        marginTop: '5px',
        fontSize: '12px',
        color: 'gray'
    },
    tags: {},
    answeredQuestionsCount: {
        marginLeft: '20px'
    }
}
