import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class QuestionsGame extends Component {
  constructor() {
    super();
    this.second = 1000;
    this.state = {
      index: 0,
      answered: false,
      shuffledQuestions: [],
      shuffled: false,
      timer: 30,
      timerOver: false,
    };
  }

  componentDidMount() {
    const { timer } = this.state;
    if (timer > 0) {
      this.decreaseTimer();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === 0) {
      this.setState({
        timerOver: true,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  decreaseTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.timerID = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }, this.second);
    }
  }

shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

  getShuffledQuestions = () => {
    const { index, shuffled } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const question = [actualQuestion.correct_answer, ...actualQuestion.incorrect_answers];
    if (!shuffled) {
      this.setState({
        shuffledQuestions: this.shuffle(question),
        shuffled: true,
      });
    }
  }

  colorChangeOnClick = () => {
    this.setState({
      answered: true,
    });
  }

  render() {
    const { index, answered, shuffledQuestions, timer, timerOver } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const correctAnswer = actualQuestion.correct_answer;
    this.getShuffledQuestions();
    return (
      <div>
        <h2 data-testid="question-category">{ actualQuestion.category }</h2>
        <h3 data-testid="question-text">{ actualQuestion.question }</h3>
        <h4>{ timerOver ? '0' : timer }</h4>
        <div data-testid="answer-options">
          {shuffledQuestions.map((element) => {
            if (element === correctAnswer) {
              return (
                <button
                  disabled={ timerOver }
                  onClick={ this.colorChangeOnClick }
                  key={ element }
                  type="button"
                  data-testid="correct-answer"
                  className={ answered ? 'correct-answer' : '' }
                >
                  { element }

                </button>
              );
            }
            return (
              <button
                disabled={ timerOver }
                onClick={ this.colorChangeOnClick }
                key={ element }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className={ answered ? 'wrong-answer' : '' }
              >
                { element }

              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.questions.results,
});

QuestionsGame.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(QuestionsGame);
