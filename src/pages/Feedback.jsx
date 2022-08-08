import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  state = { }

  render() {
    const { assertions, score } = this.props;
    const assertionsNumber = 3;
    return (
      <div>
        <Header />
        {
          assertions < assertionsNumber
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
