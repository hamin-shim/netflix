// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import {
  IGetMoviesResult,
  IGetTvsResult,
  searchMovies,
  searchTvs,
} from "../api";
import { makeImagePath } from "../utils";
const Wrapper = styled.div`
  margin-top: 20px;
  padding: 60px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Category = styled.h2`
  font-size: 50px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 20px;
`;
const Result = styled.div`
  border-top: 2px solid ${(props) => props.theme.black.lighter};
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-rows: 350px;
`;
const Title = styled.div`
  position: absolute;
  height: 30px;
  bottom: 50px;
`;
const Image = styled.div<{ bgImg: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 300px;
  width: 200px;
`;
const Each = styled.div`
  position: relative;
`;
function Search() {
  const location = useLocation();
  let keyword = new URLSearchParams(location.search).get("keyword");
  const {
    data: MovieData,
    isLoading: MovieLoading,
    refetch: refetchMovie,
  } = useQuery<IGetMoviesResult>(["movie", "movieresult"], () =>
    searchMovies(keyword + "")
  );
  const {
    data: TvData,
    isLoading: TvLoading,
    refetch: refetchTv,
  } = useQuery<IGetTvsResult>(["tv", "tvresult"], () =>
    searchTvs(keyword + "")
  );
  useEffect(() => {
    refetchMovie();
    refetchTv();
  }, [keyword]);
  console.log("tv:");
  console.log(TvData);
  // console.log("movie:");
  // console.log(MovieData);
  return (
    <Wrapper>
      {MovieLoading && TvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Category>Movie Result ( {MovieData?.results.length} ) </Category>
          <Result>
            {MovieData?.results.map((movie) => {
              return (
                <Each key={movie.id}>
                  <Image
                    bgImg={
                      movie.poster_path
                        ? makeImagePath(movie.poster_path, "w200")
                        : "https://3.bp.blogspot.com/-WhBe10rJzG4/U4W-hvWvRCI/AAAAAAAABxg/RyWcixpgr3k/s1600/noimg.jpg"
                    }
                  />
                  <Title>{movie.title}</Title>
                </Each>
              );
            })}
          </Result>
          <Category>Tv Result ( {TvData?.results.length} ) </Category>
          <Result>
            {TvData?.results.map((Tv) => {
              return (
                <Each key={Tv.id}>
                  <Image
                    bgImg={
                      Tv.poster_path
                        ? makeImagePath(Tv.poster_path, "w200")
                        : "https://3.bp.blogspot.com/-WhBe10rJzG4/U4W-hvWvRCI/AAAAAAAABxg/RyWcixpgr3k/s1600/noimg.jpg"
                    }
                  />
                  <Title>{Tv.name}</Title>
                </Each>
              );
            })}
          </Result>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
