import { ADD_MOVIELIST } from "../types/movieAddType";
import { DELETE_MOVIELIST } from "../types/movieDeleteType";
import { GET_MOVIEINFO } from "../types/movieGetType";
import { GET_MOVIELIST } from "../types/movieType";
import { UPDATE_MOVIEINFO } from "../types/movieUpdateType";

const stateDefault = {
    movieList: [],
    movieInfo: {},
    selectedFilm: null,
    error:'',
}

export const movieReducer = (state = stateDefault, { payload, type }) => {
    switch (type) {
        case GET_MOVIELIST: {
            let data = [...state.movieList]
            data = payload
            return { ...state, movieList: data }
        }
        case ADD_MOVIELIST: {
            let data = [...state.movieList]
            let film = payload
            data.push(film)
            return { ...state, movieList: data,error:payload }
        }
        case GET_MOVIEINFO: {
            let data = { ...state.movieInfo }
            data = payload
            return { ...state, movieInfo: data }
        }
        case UPDATE_MOVIEINFO: {
            const newMovieList = state.movieList.map(item => item.maPhim === payload.maPhim ? payload : item)
            state.selectedFilm = null
            return { ...state, movieList: newMovieList }
        }
        case DELETE_MOVIELIST: {
            let data = state.movieList.filter((item) => item.maPhim !== payload)
            return { ...state, movieInfo: data,error:payload }
        }
        default: return state
    }
}