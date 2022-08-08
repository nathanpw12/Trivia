import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions';

class Ranking extends Component {
  historyBtnLogin = () => {
    const { history, resetGame } = this.props;
    resetGame();
    history.push('/');
  }

  getLocalStorageRanking = () => {
    const score = JSON.parse(localStorage.getItem('ranking'));
    const scores = score.sort((a, b) => b.score - a.score);
    return scores;
  }

  render() {
    const scores = this.getLocalStorageRanking();
    return (
      <div data-testid="ranking-title">
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.historyBtnLogin }
        >
          {' '}
          Back
          {' '}
        </button>
        <ol>
          {
            scores.map((element, index) => (
              <li key={ element.name }>
                <img src={ element.picture } alt="img-profile" />
                <p data-testid={ `player-name-${index}` }>{element.name}</p>
                <p data-testid={ `player-score-${index}` }>{element.score}</p>
              </li>))
          }
        </ol>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(newGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);
