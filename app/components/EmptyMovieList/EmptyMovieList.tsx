import { useState } from 'react'
import Button from '~/components/Button'
import CreateMoveList from '~/components/CreateMovieList'
import type { MovieList } from '~/generated/graphql'

type EmptyMovieListProps = {
  updateNewMovieList: (newMovieList: Pick<MovieList, 'id' | 'name'>) => void
}

const EmptyMovieList = ({ updateNewMovieList }: EmptyMovieListProps) => {
  const [showCreateMovieList, setShowCreateMovieList] = useState(false)

  const onCloseHandler = (val: string) => {
    if (val === 'close') setShowCreateMovieList(false)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-9">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-white">Create Your First Movie List</h1>
        <p className="text-base text-grey">
          Lights, camera, action! Your movie marathon starts here XD
        </p>
      </div>
      <Button
        label="CREATE MOVIE LIST"
        onClick={() => setShowCreateMovieList(true)}
      />
      <CreateMoveList
        isOpen={showCreateMovieList}
        onClose={onCloseHandler}
        updateNewMovieListValue={updateNewMovieList}
      />
    </div>
  )
}

export default EmptyMovieList
