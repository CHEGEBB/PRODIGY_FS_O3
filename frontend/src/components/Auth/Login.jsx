import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  return (
    //   a responsive glassmorphism login page
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
          <FontAwesomeIcon icon={faUser} />
            <label htmlFor="fullname" className="form-label">
              Fullname
            </label>
            <input type="text" placeholder="fullname" />
          </div>
          <div className="user-box">
          <FontAwesomeIcon icon={faUser} />
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" placeholder="username" />
          </div>

          <a href="#">Forgot Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
