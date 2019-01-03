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

export const getSuggestion = (suggestionId) => {
  return (dispatch) => {
    fetch(`http://localhost:8000/api/sugg/${suggestionId}/`)
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: 'GET_SUGGESTION', payload: data });
    });
  };
};


export const getLists = () => {
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

export const saveFavorite=(suggestionId, listId=1)=>{
  // return {
  //   type:'SAVE_FAVORITE',
  //   payload: favorite
  // }

  // fetch('http://localhost:8000/api/favorite/', {
  //   method: 'post',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({suggestion: suggestionId})
  // }).then(res=>res.json())
  //   .then(res => console.log(res));

  return (dispatch) => {
    fetch('http://localhost:8000/api/favorite/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({suggestion: suggestionId})
    })
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: 'SAVE_FAVORITE', payload: data });
    });
  };
};

export const getFavorites = () => {
  return (dispatch) => {
    fetch("http://localhost:8000/api/my/")
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: GET_FAVORITES, payload: data });
    });
  };
};

export const addSuggestion=(url)=>{
  return (dispatch) => {
    fetch('http://localhost:8000/api/suggestion/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({link: url})
    })
    .then(response => response.json())
    .then(data => {
      // if (response.status !== 200) {
      //   return this.setState({ placeholder: "Something went wrong" });
      // }
      // return response.json();
        dispatch({ type: ADD_SUGGESTION, payload: data });
    });
  };
};



//---------------------
// old functions that maybe need to be removed

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
