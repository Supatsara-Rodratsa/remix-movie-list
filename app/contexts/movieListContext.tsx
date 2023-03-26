import type { ReactNode } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'

type MovieListContextType = {
  currentMovieSearch: string
  setCurrentMovieSearch(currentValue: string): void
  currentAutoComplete: string[]
  setCurrentAutoComplete(currentValue: string[]): void
}

const movieListContextDefaultValues: MovieListContextType = {
  currentMovieSearch: '',
  setCurrentMovieSearch: () => {},
  currentAutoComplete: [],
  setCurrentAutoComplete: () => {},
}

const MovieListContext = createContext<MovieListContextType>(
  movieListContextDefaultValues
)

type MovieListProviderProps = {
  children: ReactNode
}

export function MovieListProvider({ children }: MovieListProviderProps) {
  const [currentMovieSearch, setCurrentMovieSearch] = useState<string>('')
  const [currentAutoComplete, setCurrentAutoComplete] = useState<string[]>([])

  const data = {
    currentMovieSearch,
    setCurrentMovieSearch,
    currentAutoComplete,
    setCurrentAutoComplete,
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
