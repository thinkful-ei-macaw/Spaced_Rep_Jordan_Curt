import React, {Component} from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import LanguageApiService from '../../services/language-api-service'


class Learn extends Component {

state = {
  error: null, 
  isCorrect: false,
  guessAnswer: false, 
  totalScore: 0,
  correctAnswer: '', 
  answer: '',
  nextWord: '',
  wordCorrectCount: 0, 
  wordInCorrectCount: 0,
}

// constructor(props) {
//   super(props);
//   this.userGuessInput = React.createRef();
//   this.submitForm = this.handleSubmitForm.bind(this)
//   this.goNext = this.goNext.bind(this)
// }

static contextType = UserContext


componentDidMount() {
   // Make a fetch request to /head endpoint when component mounts
   fetch(`${config.API_ENDPOINT}/language/head`, {
     method: 'GET',
     headers: {
       'authorization': `bearer ${TokenService.getAuthToken()}`
     }
   })
   .then (res => 
    (!res.ok) ? res.json().then(e=> Promise.reject(e)) 
    : res.json())
    .then(res => {
      // call function from UserContext
      this.context.setNextWord(res)
    })
    .catch(err=> this.setState({error: err}))
 }

 handleSubmitForm = async (e) => {
   e.preventDefault()
   this.setState({guessAnswer: true})
   
   await LanguageApiService.postGuess(this.state.answer) 
   .then(res => {
     if (res.isCorrect) {
       this.setState({
         correctAnswer: res.answer,
         totalScore: res.totalScore,
         isCorrect: true, 
         nextWord: res.nextWord,
         nextWordCorrectCount: res.wordCorrectCount,
         nextWordIncorrectCount: res.wordInCorrectCount,
         wordCorrectCount: this.state.wordCorrectCount
       })
     }
     else {
       this.setState({
         totalScore: res.totalScore,
         correctAnswer: res.answer, 
         wordInCorrectCount: this.state.wordInCorrectCount + 1, 
         nextWordCorrectCount: res.wordCorrectCount, 
         nextWordIncorrectCount: res.wordInCorrectCount,
         isCorrect: false, 
         nextWord: res.nextWord,
       })
     }
   })
   .catch(error => {
     this.setState({ error: error.message})
   })
    
   





  //  if (this.state.onResults) {
  //    this.setState({onResults: !this.state.onResults})
  //    setTimeout(() => document.getElementById('learn-guess-input').focus(), 250)
  //  } else {
  //    this.context.setCurrentWord(this.context.nextWord)
  //    this.context.setGuess(e.target.userInput.value)
  //    this.setState({onResults: !this.state.onResults})
  //  }

  //  fetch(`${config.API_ENDPOINT}/language/guess`, {
  //    method: 'POST',
  //    headers: {
  //      'content-type': 'application/json',
  //      'authorization': `bearer ${TokenService.getAuthToken()}`
  //    },
  //    body: JSON.stringify({guess: e.target.userInput.value})
  //  })
  //  .then(res => res.json())
  //  .then(json => {
  //    this.context.setNextWord(json)
  //    this.showFeedback()
  //    document.getElementById('feedback-overlay').focus()
  //    document.getElementById('learn-guess-input').value = '';
  //  })
 }

 clearFeedback = () => {
  document.getElementById('feedback-overylay').classList.add('invisible')
  document.getElementsByClassName('btn')[0].focus()
 }

 goNext(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    this.clearFeedback();
  }
 }

 getResponseText = () => {
  if(this.context.nextWord)  
    if(typeof this.context.nextWord.isCorrect !== 'undefined') {
      if(this.context.nextWord.isCorrect) {
        return 'You are correct!';
      } else {
        return 'Good try, try again';
      }
    }
 }

render() {
  return (
    <div>
      <h2>Translate the word:</h2><span>{this.context.nextWord ? this.state.onResults ? this.context.currentWord.nextWord : this.context.nextWord.nextWord : null}</span>
      <h3 onKeyPress={this.goNext} className="invisible" onClick={this.clearFeedback}>{this.getResponseText()}</h3> 
      <div className="DisplayScore">
        <p>Your total score is: {this.context.nextWord ? this.context.nextWord.totalScore : null}</p>
      </div>
      <div className="DisplayFeedback">
        <p ></p>
      </div>
      <form onSubmit={this.handleSubmitForm}>
        <label>What's the translation for this word?</label>
        <input id="learn-guess-input" name="userInput" type="text" onChange={(e) => this.setState({answer: e.currentTarget.value})}></input >
        <button type="submit"></button>
      </form>
      <p> You have answered this word correctly {this.state.onResults ? this.context.currentWord.wordCorrectCount : this.context.nextWord ? this.context.nextWord.wordCorrectCount : null}</p>
      <p> You have answered this word incorrectly {this.state.onResults ? this.context.currentWord.wordInCorrectCount : this.context.nextWord ? this.context.nextWord.wordInCorrectCount : null}</p>

     </div>
  )
}
}

export default Learn