import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setLoginError } from '../../actions';
import { GoogleLogin } from 'react-google-login';

class Login extends React.Component {

    responseGoogle = (res, type) => {
        if(type==='success'){
            this.props.setUser(res.profileObj.name);
            this.props.history.push('/weather')
        } else {
            this.props.setLoginError('Error')
        }
    }

    render() {
        const { user } = this.props;
        if(user && user.name){
            return (<Redirect to="/weather" from="/" />)
        }

        return (
            <div className="main-container-wrapper relative-position" id="main-container-wrapper" style={{ backgroundImage: `url("https://d2pd5v9y7ukdgh.cloudfront.net/G2U/banners/login-bg@2x.jpg")`, width: '100%', height:"100vh", overflow: 'hidden'}}>
                <div className="main-container-wrapper-body-home height-100vh" id="main-container-wrapper-body" style={{  }}>
                    <div className="login-container-m">
                        <div className="section-login-bg-m" >
                        <div className="section-login-body">
                            <div style={{ marginLeft: '40%', marginTop: '20%' }}> 
                            <div className="section-login-text">
                                <img src="http://d2pd5v9y7ukdgh.cloudfront.net/GAMERSMOBY_NEW_UI/gamersmoby/theme2/assets/images/icons/login-logo_v1.svg" alt="GamersMoby" />
                                <h2 className="login-subtitle" style={{color : 'white'}}>
                                    Play 100+ free games <br />and win
            <span style={{ color: 'var(--primary-text-color)' }}>prizes!</span>
                                </h2>
                            </div>
                            <div className="section-login-btn">
                                <GoogleLogin
                                    clientId="215250802326-l97pv4up77imeffpo3p0fq0q2esaj7gk.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={(e) => this.responseGoogle(e, 'success')}
                                    onFailure={(e) => this.responseGoogle(e, 'fail')}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ login }) => ({
    user: login.user,
    isLoading: login.isLoading,
    error: login.error
});

const mapDispatchToProps = dispatch => ({
    setUser: (data) => dispatch(setUser(data)),
    setLoginError: (data) => dispatch(setLoginError(data))
});

const LoginComponent = withRouter(Login);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent);
