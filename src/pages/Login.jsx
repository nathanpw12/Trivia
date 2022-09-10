import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      button: true,
      user: '',
      email: '',
    };
  }

  verifyButton = () => {
    const { user, email } = this.state;
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    const USER_LENGTH = 0;
    if (regex.test(email) && user.length > USER_LENGTH) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  inputHandle = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.verifyButton();
      },
    );
  };

  fetchToken = async () => {
    const { history, loginSubmit } = this.props;
    const { user, email } = this.state;
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const data = await response.json();
    localStorage.setItem('token', data.token);
    loginSubmit(user, email);
    history.push('/game');
  };

  settingsButtons = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { user, email, button } = this.state;
    return (
      <div className="login-from">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="inpus-login">
          <label htmlFor="name">
            Nome
            <input
              id="name"
              name="user"
              data-testid="input-player-name"
              type="text"
              value={ user }
              onChange={ this.inputHandle }
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.inputHandle }
            />
          </label>

        </div>

        <button
          onClick={ this.fetchToken }
          disabled={ button }
          type="button"
          data-testid="btn-play"
        >
          Play
        </button>

        <button type="button" data-testid="btn-settings" onClick={ this.settingsButtons }>
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSubmit: (user, email) => dispatch(loginAction(user, email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginSubmit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
