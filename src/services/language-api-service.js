import config from '../config'
import TokenService from './token-service'

const LanguageApiService = {





 postGuess(guess) {
   return fetch(`${config.API_ENDPOINT}/language/guess`, {
     method: 'POST',
     headers: {
       'content-type':'application/json', 
       'authorization': `bearer ${TokenService.getAuthToken()}`
     },
     body: JSON.stringify({guess: guess})
   })
   .then(res => {
     return(!res.ok)
     ? res.json().then(e=> Promise.reject(e)) : res.json()
   })
 }

}

export default LanguageApiService