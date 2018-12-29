import { GET_SUGGESTIONS,GET_FAVORITES,GET_LISTS, ADD_SUGGESTION, ADD_FAVORITE, TOGGLE_MODAL,SELECT_SUGGESTION } from '../constants/actionTypes';
import server from '../apis/server'

export const addFavorite=(favorite)=>{
  return {
    type:ADD_FAVORITE,
    payload: favorite
  }
};

// export const getSuggestions=()=>{
//   return async  dispatch=>{
//     const response = await server.get('/suggestions');
//     dispatch({type:GET_SUGGESTIONS,payload:response.data});
//   }
// };

export const getSuggestions = () => {

  return (dispatch) => {
    fetch("http://localhost:8000/api/sugg/")
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: GET_SUGGESTIONS, payload: data });
    });
  };


};

export const getLists = () => {
  // return async dispatch => {
  //   const response = await server.get('/lists');
  //   dispatch({ type: 'GET_LISTS', payload: response.data.data });
  // };

  return (dispatch) => {
    fetch("http://localhost:8000/api/lst/")
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: GET_SUGGESTIONS, payload: data });
    });
  };
};

export const getFavorites = () => {
  // return async dispatch => {
  //   const response = await server.get('/favorites');
  //   dispatch({ type: GET_FAVORITES, payload: response.data.data });
  // };
  
};


export const saveFavorite=(favorite, listItem)=>{
  console.log("saveFavorite-");
  return {
    type:'SAVE_FAVORITE',
    payload: favorite
  }
};


export const toggleModal=(arg)=>{
  console.log("toggleModal");
  return {
    type:"TOGGLE_MODAL"
  }
};

export const getModal=()=>{
  return {
    type:"GET_MODAL"
  }
};


export const selectSuggestion=(suggestion)=>{
  return {
    type:SELECT_SUGGESTION,
    payload:{
      suggestion:suggestion
    }
  }
}

export const selectSong = (song) => {
  //return action
  return {
    type: 'SONG_SELECTED',
    payload: song
  };
};
