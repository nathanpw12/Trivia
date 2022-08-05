import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestiosGame extends Component {
  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.questions.results,
});

export default connect(mapStateToProps)(QuestiosGame);
