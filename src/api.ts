// const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const API_KEY = "42fa8571efa4eec04c0b8028ca5f95c5";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
interface IGenre {
  id: number;
  name: string;
}
export interface IGetMovieDetail {
  success: boolean;
  genres: IGenre[];
  homepage: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
}
interface Iruntime {}
export interface IGetTvDetail {
  success: boolean;
  genres: IGenre[];
  homepage: string;
  vote_average: number;
  vote_count: number;
  number_of_episodes: number;
  number_of_seasons: number;
  last_air_date: string;
  first_air_date: string;
  episode_run_time: Iruntime[];
  backdrop_path: string;
  original_name: string;
  overview: string;
}

export interface IGetTvsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTvs() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function searchMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
export function searchTvs(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTvDetail(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
