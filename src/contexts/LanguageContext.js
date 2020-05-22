import React, {
  Component
} from 'react';

const LanguageContext = React.createContext({
  language: {},
  error: null,
  words: [],
  head: {},
  response: {},
  guess: '',
  setLanguage: () => {},
  setWords: () => {},
  setHead: () => {},
  setGuess: () => {},
  setResponse: () => {}
})

export default LanguageContext;

export class LangProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      language: {},
      error: null,
      words: []
    };
    this.state = state;
  }

    setLanguage = language => {
      this.setState({
        language
      })
    }

    setWords = words => {
      this.setState({words})
    }
  

  setHead = head => {
    this.setState({head})
  }

  setResponse = response => {
    this.setState({response})
  }

  setGuess = guess => {
    this.setState({ guess})
  };

render() {
  const value = {
    language: this.state.language,
    error: this.state.error,
    words: this.state.words,
    head:this.state.head, 
    guess: this.state.guess,
    response: this.state.response,

    setLanguage: this.setLanguage, 
    setWords: this.setWords, 
    setHead: this.setHead, 
    setGuess: this.state.guess,
    setResponse: this.state.response
  }
  return (
    <LanguageContext.Provider value={value}>
      {this.props.children}
    </LanguageContext.Provider>
  );
}
}

