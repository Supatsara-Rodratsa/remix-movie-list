import type { SearchMovieByTitleQuery } from '~/generated/graphql'
import MovieCard from '../MovieCard'

type MovieSearchResultProps = {
  movieList: SearchMovieByTitleQuery['searchMovieByTitle']
}

const MovieSearchResult = ({ movieList }: MovieSearchResultProps) => {
  console.log(movieList, 'movieList')

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6">
      {movieList?.map((movie) => (
        <MovieCard
          key={movie?.imdbID}
          Title={movie?.Title}
          Poster={movie?.Poster}
          Year={movie?.Year}
          Type={movie?.Type}
        />
      ))}
    </div>
  )
}

export default MovieSearchResult
