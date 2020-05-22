import React, {Component} from 'react'
// import UserContext from '../../contexts/UserContext'
import LanguageApiService from '../../services/language-api-service'
import LangContext from '../../contexts/LanguageContext';


class Learn extends Component {
  static contextType = LangContext

  state = {
    formIsRendered: true
  }

// state = {
//   error: null, 
//   isCorrect: false,
//   guessAnswer: false, 
//   totalScore: 0,
//   correctAnswer: '', 
//   answer: '',
//   nextWord: '',
//   wordCorrectCount: 0, 
//   wordInCorrectCount: 0,
// }

componentDidMount() {

   // Make a fetch request to /head endpoint when component mounts
  this.handleNextWord()
     LanguageApiService.getLanguage()
    .then(res => {
      this.context.setLanguage(res.language)
    })
  }
    
 
 
 handleSubmitForm = e => {
   e.preventDefault()   

   // Use API service to send guess to the server
   LanguageApiService.postGuess(this.context.guess) 
   .then(res => {
     this.context.setResponse(res);
     this.setState({formIsRendered: false});
   });
  };
   

  handleNextWord = () => {

    // Endpoint for grabbing the current head
    LanguageApiService.getHead()
    .then(res => {
     this.context.setHead(res)
     this.setState({renderForm: true});
    this.context.setGuess('');
    })

  }

  
//  clearFeedback = () => {
//   document.getElementById('feedback-overylay').classList.add('invisible')
//   document.getElementsByClassName('btn')[0].focus()
//  }

//  goNext(e) {
//   if (e.key === 'Enter' || e.key === ' ') {
//     this.clearFeedback();
//   }
//  }

//  getResponseText = () => {
//   if(this.context.nextWord)  
//     if(typeof this.context.nextWord.isCorrect !== 'undefined') {
//       if(this.context.nextWord.isCorrect) {
//         return 'You are correct!';
//       } else {
//         return 'Good try, try again';
//       }
//     }
//  }

 renderForm = () => {
   let head = this.context.head || {};
   let response = this.context.response || {};
   let language = this.context.language || {};
 
  return (
    <>
      <h2>Translate the word:</h2>
      <h4>{head.wordInCorrectCount}</h4>
      <h3>{head.totalScore}</h3>
      <h4>{head.wordCorrectCount}</h4>
      <span>{!response.nextWord ? head.nextWord : response.nextWord}</span>
      <p>Your total score is :{' '}
      {!response.totalScore ? head.totalScore : response.totalScore}
      </p>
      <p>
      You have answered this word correctly {head.wordCorrectCount} times.
      </p>
      <p>
      You have answered this word incorrectly {head.wordInCorrectCount}{' '} times.
      </p>
      <form onSubmit={e => this.handleSubmitForm(e)}>
        <label>What's the translation for this word?</label>
        <input
        id="learn-guess-input" 
        name="guess" type="text" 
        value={this.context.guess || ''}
        onChange={e => this.context.setGuess(language.name == null
           ? e.target.value
           : language.name === 'Spanish'
           ? e.target.value.toUpperCase() 
           : e.target.value
           )
          }
           required
       />
        <button type="submit"></button>
      </form>
     </>
  )
 }


renderResponse = () => {
  let head = this.context.head || {};
  let response = this.context.response || {};
  return (
    <>
    <h2>
      {response.isCorrect === true ? 'You were correct!': 'Nice try, but not quite right:({'}
    </h2>
    <div>
      <p>Your total score is: {response.totalScore}</p>
    </div>
    <div> 
      {response.isCorrect ? head.wordInCorrectCount : head.wordInCorrectCount + 1}
    </div>
    <div>
      <h3>{response.totalScore}</h3>
    </div>
    <div>
      <h4>
      {response.isCorrect ? head.wordCorrectCount + 1 : head.wordCorrectCount}
      </h4>
    </div>
      <span className='word word-response' data-decoded={response.answer}>
          {head.nextWord}
      </span>
      <div className="DisplayFeedback hide-offset">
        <p>
          The correct translation for {head.nextWord} was {response.answer}{' '} 
          and you chose {this.context.guess}!
        </p>
      </div>
      <button onClick={this.handleNextWord} className={response.isCorrect ? 'correct-button next-button'
       : 'wrong-button next-button'}>Try again</button>
    </>
  );
}

  render() {
   let formIsRendered = this.state.formIsRendered;
    return ( 
      <section className='learningRoute-section'>
        {formIsRendered ? this.renderForm() : this.renderResponse()}
      </section>
    );
  }
}




export default Learn