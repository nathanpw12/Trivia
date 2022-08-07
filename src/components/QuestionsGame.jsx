import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { scoreAction } from '../redux/actions';

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
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, this.second);
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
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  getShuffledQuestions = () => {
    const { index, shuffled } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const question = [
      actualQuestion.correct_answer,
      ...actualQuestion.incorrect_answers,
    ];
    if (!shuffled) {
      this.setState({
        shuffledQuestions: this.shuffle(question),
        shuffled: true,
      });
    }
  };

  colorChangeOnClick = () => {
    this.setState({
      answered: true,
    });
  };

  submitCorrectQuestion = () => {
    const { timer, index } = this.state;
    const { questions, submitQuestion } = this.props;
    const hard = 3;
    const magicNumber = 10;
    let difficulty = 0;
    const actualQuestionDifficulty = questions[index].difficulty;
    switch (actualQuestionDifficulty) {
    case 'easy':
      difficulty = 1;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'hard':
      difficulty = hard;
      break;
    default:
      return '';
    }
    const score = magicNumber + timer * difficulty;
    submitQuestion(score);
    this.colorChangeOnClick();
  };

  handleNextButtun = () => {
    const { index } = this.state;
    const { history } = this.props;
    const lastQuestionIndex = 4;
    if (index === lastQuestionIndex) {
      history.push('/feedback');
    } else {
      this.setState((prev) => ({
        index: prev.index + 1,
        timerOver: false,
        answered: false,
        shuffled: false,
        timer: 30,
      }));
    }
  }

  render() {
    const { index, answered, shuffledQuestions, timer, timerOver } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const correctAnswer = actualQuestion.correct_answer;
    this.getShuffledQuestions();
    return (
      <div>
        <h2 data-testid="question-category">{actualQuestion.category}</h2>
        <h3 data-testid="question-text">{actualQuestion.question}</h3>
        <h4>{timerOver ? '0' : timer}</h4>
        <div data-testid="answer-options">
          {shuffledQuestions.map((element) => {
            if (element === correctAnswer) {
              return (
                <button
                  disabled={ timerOver }
                  onClick={ this.submitCorrectQuestion }
                  key={ element }
                  type="button"
                  data-testid="correct-answer"
                  className={ answered ? 'correct-answer' : '' }
                >
                  {element}
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
                {element}
              </button>
            );
          })}
        </div>
        {timerOver || answered ? (
          <button data-testid="btn-next" type="button" onClick={ this.handleNextButtun }>
            Next
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  submitQuestion: (score) => dispatch(scoreAction(score)),
});

QuestionsGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  submitQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsGame);
