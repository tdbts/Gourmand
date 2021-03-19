import './Login.css';

const Login = ({}) => {
    return (
        <div className="login-container"  style={{backgroundImage: 'url(/login-background.jpg)'}}>
            <div className="text-container">
                <h3 className="login-text login-header">We're sorry.  User accounts aren't available yet.</h3>
                <h6 className="login-text">But you can be sure that, like a good bar, that feature is just around the corner.  🥂  </h6>
            </div>
        </div>
    );
};

export default Login;
