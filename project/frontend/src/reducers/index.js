import {combineReducers} from 'redux';

import {
  GET_SUGGESTIONS,
  GET_SUGGESTION,
  GET_FAVORITES,
  ADD_SUGGESTION,
  ADD_FAVORITE,
  TOGGLE_MODAL,
  SELECT_SUGGESTION
} from '../constants/actionTypes';

const initialSuggestions = [
  {
    id: 1,
    title: "NodeJS web development",
    img_link: "book1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nulla."
  },
  {
    id: 2,
    title: "Node.js Tutorial for Beginners",
    img_link: "http://img.youtube.com/vi/C7TFgfY7JdE/mqdefault.jpg",
    description: "Node.js Tutorial for Beginners: Learn Node in 1 Hour | Mosh"
  },
  {
    id: 3,
    title: "Effective Java",
    img_link: "book1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nulla."
  },
];

const initialLists = [
  {
    id: 1,
    title: "JavaScript"
  },
  {
    id: 2,
    title: "Java"
  },
  {
    id: 3,
    title: "C++"
  }
]
const initialState = {
  suggestions: initialSuggestions,
  favorites: [],
  showModal: false,
  lists: initialLists,
  currentPage: "suggestions",
  selectedSuggestion: {}
};


const currentState = {
  suggestions: initialSuggestions,
  favorites: [],
  showModal: false,
  lists: initialLists,
  currentPage: "suggestions",
  selectedSuggestion: {}
};

let modalVar = false;

const getSuggestions = (state=[],action) => {
  switch (action.type) {
    case GET_SUGGESTIONS:
      return action.payload;
    default:
      return state;
  }
};

const getSuggestion = (state=null,action) => {
  switch (action.type) {
    case GET_SUGGESTION:
      return action.payload;
    default:
      return state;
  }
};

const saveFavoriteReducer = (state = [], action) => {
  if (action.type === 'SAVE_FAVORITE') {
    return [...state,action.payload];
  } else {
    return state;
  }
};


const getFavorites = (state=[],action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};

const getLists = (state=[],action) => {
  switch (action.type) {
    case 'GET_LISTS':
      return action.payload;
    default:
      return state;
  }
};



const getSelectedSuggestion = () => {
  return currentState.selectedSuggestion;
};

const getModalStatus = () => {
  return currentState.showModal;
};

const getModal = (state = initialState, action) => {
  if (action.type === "GET_MODAL") {
    return currentState.showModal;
  } else {
    return state;
  }
};




const selectSuggestion = (state = {}, action) => {
  if (action.type === SELECT_SUGGESTION) {
    return {...state, selectedSuggestion: action.payload}

  } else {
    return state;
  }
};


const songsReducer =() =>{
  return [
    {title: 'Smells like teen spirit', duration: '4:20'},
    {title: 'God of emptiness', duration :'3:33'},
    {title:'Where the slime lives',duration:'4:14'},
  ];
};

const selectedSongReducer=(selectedSong=null,action)=>{
  if(action.type==='SONG_SELECTED'){
    return action.payload;
  }
  return selectedSong;
}

const toggleModalReducer = (state = false, action) => {
  if (action.type === 'TOGGLE_MODAL') {
    const retval=!state;
    return retval;
  } else {
    return state;
  }
};

const addFavoriteReducer = (state = {}, action) => {
  if (action.type === ADD_FAVORITE) {
    console.log("addFavoriteReducer");
    return action.payload;
  } else {
    return state;
  }
};


const postsReducer =(state=[], action)=>{

  switch(action.type){
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }

}

export default combineReducers({
  toggleModal:toggleModalReducer,
  modal:getModalStatus,
  suggestions: getSuggestions,
  suggestion: getSuggestion,
  songs:songsReducer,
  addFavorite:addFavoriteReducer,
  lists: getLists,
  posts: postsReducer,
  saveFavorite:saveFavoriteReducer,
  selectedSong: selectedSongReducer
});