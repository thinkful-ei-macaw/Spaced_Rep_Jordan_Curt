import React, {Component} from 'react'
import LanguageApiService from '../../services/language-api-service';
import LanguageContext from '../../contexts/LanguageContext';
import './Learn.css';


class Learn extends Component {
  static contextType = LanguageContext

  state = {
    formIsRendered: true
  }

 
 handleSubmitForm = e => {
   e.preventDefault()   

   // Use API service to send the users guess to the server
   // Pass in this.context.guess which is from state in LanguageContext
   LanguageApiService.postGuess(this.context.guess) 
   .then(res => {

   // Set response f
     this.context.setResponse(res);
     this.setState({formIsRendered: false});
   });
  };
   

  handleNextWord = () => {
   this.context.setGuess('')
  this.context.setHead(this.context.response)
       this.setState({formIsRendered: true});

  }

 renderForm = () => {
   let head = this.context.head || {};
   let response = this.context.response || {};
   let language = this.context.language || {};

  return (
    <div className="learn-page">
      <h2>Translate the word:</h2>
      <span>{!response.nextWord ? head.nextWord : response.nextWord}</span>
     <form onSubmit={e => this.handleSubmitForm(e)}>
       <fieldset>
        <label htmlFor="learn-guess-input">What's the translation for this word?</label>
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
        <button type="submit" className="btn">Submit your answer</button>
        </fieldset>
      </form>
         <div className="DisplayScore">
      <p>Your total score is:{' '}
      {!response.totalScore ? head.totalScore : response.totalScore}
      </p>
        </div>
      <p className="word-count">
      You have answered this word correctly {head.wordCorrectCount} times.
      </p>
      <p className="word-count">
      You have answered this word incorrectly {head.wordIncorrectCount} times.
      </p>
      
     </div>
  )
 }


renderResponse = () => {
  let head = this.context.head || {};
  let response = this.context.response || {};
  return (
    <>
    <div className="feedback-page">
    <h2 className="feedback">
      {response.isCorrect === true ? 'You were correct! :D': 'Good try, but not quite right :('}
    </h2>
    <div className="DisplayScore">
      <p>Your total score is: {response.totalScore}</p>
    </div>
    
  
     
      <div className="DisplayFeedback">
        <p>
          The correct translation for {head.nextWord} was {response.answer}{' '} 
          and you chose {this.context.guess}!
        </p>
      </div>
      <button onClick={this.handleNextWord} className={response.isCorrect ? 'correct-button next-button'
       : 'wrong-button next-button'}>Try another word!</button>
       </div>
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