'use client'
import { useState } from 'react'

import EmptyMovieList from '~/components/EmptyMovieList'

const MovieListWrapper = () => {
  const [movieLists] = useState<any[]>([])
  if (movieLists.length === 0) {
    return <EmptyMovieList />
  }
  return <div>Hi</div>
}

export default MovieListWrapper
