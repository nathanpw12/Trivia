import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  state = { }

  render() {
    const { assertions } = this.props;
    const assertionsNumber = 3;
    return (
      <div>
        <Header />
        {
          assertions < assertionsNumber
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
