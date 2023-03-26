import type {
  SearchMovieByTitleQuery,
  GetMovieListsQuery,
} from '~/generated/graphql'
import MovieCard from '../MovieCard'
import { useMovieList } from '~/contexts/movieListContext'
import { useEffect } from 'react'

type MovieSearchResultProps = {
  movieList: SearchMovieByTitleQuery['searchMovieByTitle']
  currentMovieList: GetMovieListsQuery['getMovieLists']
}

const MovieSearchResult = ({
  movieList,
  currentMovieList,
}: MovieSearchResultProps) => {
  const { setCurrentAutoComplete } = useMovieList()

  useEffect(() => {
    if (movieList) {
      setCurrentAutoComplete(movieList.map((movie) => movie?.Title || ''))
    }
  }, [movieList, setCurrentAutoComplete])

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6">
      {movieList?.map((movie) => (
        <MovieCard
          key={movie?.imdbID}
          movie={{ ...movie }}
          currentMovieList={currentMovieList}
        />
      ))}
    </div>
  )
}

export default MovieSearchResult
