import React, { Component } from 'react';

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
    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  };

  render() {
    const { user, email, button } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
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
          Email:
          <input
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.inputHandle }
          />
        </label>

        <button disabled={ button } type="button" data-testid="btn-play">
          Play
        </button>
      </div>
    );
  }
}

export default Login;
