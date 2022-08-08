import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { newGame } from '../redux/actions';

class Feedback extends Component {
  historyBtnPlayAgain = () => {
    const { history, resetGame } = this.props;
    resetGame();
    history.push('/');
  }

  historyBtnRanking = () => {
    const { history, name, score, email } = this.props;
    const rankingLocalStorage = localStorage.getItem('ranking');
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const actualPlayer = {
      name,
      score,
      picture,
    };
    if (rankingLocalStorage === null) {
      localStorage.setItem('ranking', JSON.stringify([actualPlayer]));
    } else {
      const ranking = JSON.parse(rankingLocalStorage);
      ranking.push(actualPlayer);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    history.push('/ranking');
  }

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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.historyBtnPlayAgain }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.historyBtnRanking }
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
  name: store.player.name,
  email: store.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(newGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
