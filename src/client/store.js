//this store function will create the store in the entry of the app

import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let finalCreateStore = compose(
  applyMiddleware(thunk, logger())
)(createStore)

function ready(){
  for (var type in this.types) {
    if (this.types[type]){
      return true;
    }
  }
  return false;
};


let defInitialState = {
  // text: '',
  // convo: [],
  apis: {
    aylien: {
      view: false,
      types: {
        classify: false,
        sentiment: false,
        concepts: false,
        hashtags: false
      },
    ready: ready
    },
    rosette: {
      view: false,
      types: {
        categories: false,
        sentiment: false,
        entities: false,
        relationships: false
      },
      ready: ready
    },
    indico: {
      view: false,
      types: {
        texttags: false,
        sentiment: false,
        personality: false,
        people: false,
        political: false,
        emotion: false
      },
      ready: ready
    },
    meaningcloud: {
      view: false,
      types: {
        classification: false,
        sentiment: false,
        topics: false
      },
      ready: ready
    }
  }
}

export default function configureStore(initialState = defInitialState){
  return finalCreateStore(rootReducer, initialState)
}
