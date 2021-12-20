import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovieDetail,
  getMovies,
  IGetMovieDetail,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .runtime {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const BigOverview = styled.p`
  .runtime {
    margin-left: 5px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;
const Description = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Genres = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
  }
`;
const Genre = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.darker};
  margin: 0 5px;
  padding: 10px;
  border-radius: 5px;
`;

const Release = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    &:last-child {
      font-size: 25px;
    }
    &:first-child {
      font-size: 15px;
      color: ${(props) => props.theme.white.darker};
      text-align: right;
    }
  }
`;

const Homepage = styled.div`
  a {
    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.white.darker};
    }
  }
`;

const Rate = styled.div``;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const {
    data: DetailData,
    isLoading: DeatilLoading,
    refetch,
  } = useQuery<IGetMovieDetail>(["movie", "detail"], () =>
    getMovieDetail(Number(bigMovieMatch?.params.movieId))
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");

  useEffect(() => {
    if (bigMovieMatch?.params.movieId !== undefined) {
      refetch();
    }
  }, [bigMovieMatch?.params.movieId]);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          {DetailData?.success === false ? (
            <h1>Loading...</h1>
          ) : (
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.movieId}
                  >
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            DetailData?.backdrop_path + "",
                            "w500"
                          )})`,
                        }}
                      />

                      <BigTitle>{DetailData?.original_title} </BigTitle>
                      <Description>
                        <BigOverview>
                          {DetailData?.overview}
                          <span className="runtime">
                            ( {DetailData?.runtime}m )
                          </span>
                        </BigOverview>
                        <DetailRow>
                          <Genres>
                            <span>Genre :</span>
                            {DetailData?.genres?.map((genre, idx) => {
                              if (idx < 4) {
                                return <Genre>{genre.name}</Genre>;
                              }
                            })}
                          </Genres>

                          <Release>
                            <span>Released</span>
                            <span>{DetailData?.release_date}</span>
                          </Release>
                        </DetailRow>
                        <DetailRow>
                          <Rate>
                            Rate : {DetailData?.vote_average} / 10 ({" "}
                            {DetailData?.vote_count} ){" "}
                          </Rate>
                          <Homepage>
                            <a href={DetailData?.homepage}>
                              {DetailData?.homepage}
                            </a>
                          </Homepage>
                        </DetailRow>
                      </Description>
                    </>
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          )}
        </>
      )}
    </Wrapper>
  );
}
export default Home;
