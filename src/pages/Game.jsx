import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import Header from '../components/Header';
import QuestionsGame from '../components/QuestionsGame';
import { questionsActions } from '../redux/actions';
import logo from '../trivia.png';

class Game extends Component {
  componentDidMount() {
    this.fetchQuestions();
  }

  errorRequest = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  fetchQuestions = async () => {
    const { questionsDispatch } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();
    if (data.response_code === 0) {
      const seconds = 700;
      setTimeout(() => {
        questionsDispatch(data.results);
      }, seconds);
    } else {
      this.errorRequest();
    }
  };

  render() {
    const { questions, history } = this.props;
    return (
      <>
        <Header />
        <img src={ logo } className="App-logo" alt="logo" />
        { questions.length > 0 ? (
          <QuestionsGame history={ history } />
        ) : (
          <ReactLoading type="spin" width="8%" height="8%" />
        )}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questionsDispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (store) => ({
  questions: store.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionsDispatch: (response) => dispatch(questionsActions(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
