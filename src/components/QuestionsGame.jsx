import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionsGame extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
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
    const { index } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const question = [actualQuestion.correct_answer, ...actualQuestion.incorrect_answers];
    return this.shuffle(question);
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[index];
    const correctAnswer = actualQuestion.correct_answer;
    const shuffledQuestions = this.getShuffledQuestions();
    return (
      <div>
        <h2 data-testid="question-category">{ actualQuestion.category }</h2>
        <h3 data-testid="question-text">{ actualQuestion.question }</h3>
        <div data-testid="answer-options">
          {shuffledQuestions.map((element) => {
            if (element === correctAnswer) {
              return (
                <button
                  key={ element }
                  type="button"
                  data-testid="correct-answer"
                >
                  { element }

                </button>
              );
            }
            return (
              <button
                key={ element }
                type="button"
                data-testid={ `wrong-answer-${index}` }
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
