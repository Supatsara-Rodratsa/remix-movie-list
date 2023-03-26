import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import type { Status } from '~/types/types'

type MovieListContextType = {
  currentMovieSearch: string
  setCurrentMovieSearch(currentValue: string): void
  currentAutoComplete: string[]
  setCurrentAutoComplete(currentValue: string[]): void
  currentStatus: Status | null
  setCurrentStatus(currentValue: Status): void
}

const movieListContextDefaultValues: MovieListContextType = {
  currentMovieSearch: '',
  setCurrentMovieSearch: () => {},
  currentAutoComplete: [],
  setCurrentAutoComplete: () => {},
  currentStatus: null,
  setCurrentStatus: () => {},
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
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentStatus(null)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [currentStatus])

  const data = {
    currentMovieSearch,
    setCurrentMovieSearch,
    currentAutoComplete,
    setCurrentAutoComplete,
    currentStatus,
    setCurrentStatus,
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
