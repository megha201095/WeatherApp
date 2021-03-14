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
            <div className="main-container-wrapper relative-position" id="main-container-wrapper" style={{  }}>
                <div className="main-container-wrapper-body-home height-100vh" id="main-container-wrapper-body" style={{  }}>
                    <div className="login-container-m">
                        <div className="section-login-bg-m">
                            <img src="https://d2pd5v9y7ukdgh.cloudfront.net/G2U/banners/login-bg@2x.jpg" style={{  width: '100%' }} alt="Login Bg" />
                        </div>
                        <div className="section-login-body">
                            <div className="section-login-text">
                                <img src="http://d2pd5v9y7ukdgh.cloudfront.net/GAMERSMOBY_NEW_UI/gamersmoby/theme2/assets/images/icons/login-logo_v1.svg" alt="GamersMoby" />
                                <h2 className="login-subtitle">
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
                                {/* <button className="btn-google-login" onclick="signInWithGoogle();">
                                    <img src="/theme2/assets/images/icons/ic-google.svg" alt="Google" /> Continue with Google </button>
                                <button className="btn-twitter-login" onclick="signInWithTwitter();" style={{}}><img alt="Twiiter" src="/theme2/assets/images/icons/ic-twitter.svg" /> Continue with Twitter </button> */}
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
