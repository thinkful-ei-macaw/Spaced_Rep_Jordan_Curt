import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn'
import {LangProvider}from '../../contexts/LanguageContext'

class LearningRoute extends Component {
  render() {
    return (
      <section>
        <LangProvider>
        <Learn/>
        </LangProvider>
      </section>
    );
  }
}

export default LearningRoute
