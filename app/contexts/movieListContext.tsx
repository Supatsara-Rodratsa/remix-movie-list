import type { ReactNode } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'

type MovieListContextType = {
  currentMovieSearch: string
  setCurrentMovieSearch(currentValue: string): void
}

const movieListContextDefaultValues: MovieListContextType = {
  currentMovieSearch: '',
  setCurrentMovieSearch: () => {},
}

const MovieListContext = createContext<MovieListContextType>(
  movieListContextDefaultValues
)

type MovieListProviderProps = {
  children: ReactNode
}

export function MovieListProvider({ children }: MovieListProviderProps) {
  const [currentMovieSearch, setCurrentMovieSearch] = useState<string>('')

  const data = {
    currentMovieSearch,
    setCurrentMovieSearch,
  }

  return (
    <MovieListContext.Provider value={data}>
      {children}
    </MovieListContext.Provider>
  )
}

export function useMovieList() {
  return useContext(MovieListContext)
}
