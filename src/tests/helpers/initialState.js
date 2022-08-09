export const initialState = {
    player: {
      name: 'guilherme',
      assertions: 0,
      score: 0,
      gravatarEmail: 'asdasd@gmasd,com'
    },
    questions: {
      results: [
        {
          category: 'History',
          type: 'boolean',
          difficulty: 'medium',
          question: 'Brezhnev was the 5th leader of the USSR.',
          correct_answer: 'True',
          incorrect_answers: [
            'False'
          ]
        },
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'hard',
          question: 'Which of Michael Jackson&#039;s albums sold the most copies?',
          correct_answer: 'Thriller',
          incorrect_answers: [
            'Dangerous',
            'Bad',
            'Off the Wall'
          ]
        },
        {
          category: 'Sports',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What is the full name of the footballer &quot;Cristiano Ronaldo&quot;?',
          correct_answer: 'Cristiano Ronaldo dos Santos Aveiro',
          incorrect_answers: [
            'Cristiano Ronaldo los Santos Diego',
            'Cristiano Armando Diego Ronaldo',
            'Cristiano Luis Armando Ronaldo'
          ]
        },
        {
          category: 'Entertainment: Board Games',
          type: 'multiple',
          difficulty: 'hard',
          question: 'What Magic: The Gathering card&#039;s flavor text is just &#039;Ribbit.&#039;?',
          correct_answer: 'Turn to Frog',
          incorrect_answers: [
            'Spore Frog',
            'Bloated Toad',
            'Frogmite'
          ]
        },
        {
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which candy is NOT made by Mars?',
          correct_answer: 'Almond Joy',
          incorrect_answers: [
            'M&amp;M&#039;s',
            'Twix',
            'Snickers'
          ]
        }
      ]
    }
  }