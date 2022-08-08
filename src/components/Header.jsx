import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, user, score } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="user-img" />
        <p
          data-testid="header-player-name"
        >
          { user }
        </p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  email: store.player.gravatarEmail,
  user: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps, null)(Header);
