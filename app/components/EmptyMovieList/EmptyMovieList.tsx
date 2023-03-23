import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Button from '~/components/Button'
import CreateMoveList from '~/components/CreateMovieList'

const EmptyMovieList = () => {
  const [showCreateMovieList, setShowCreateMovieList] = useState(false)

  const onCloseHandler = (val: string) => {
    if (val === 'close') setShowCreateMovieList(false)
  }

  return (
    <AnimatePresence>
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl text-white">Create Your First Movie List</h1>
          <p className="text-base text-grey">
            Lights, camera, action! Your movie marathon starts here XD
          </p>
        </div>
        <Button
          label="CREATE MOVIE LIST"
          customStyle="bg-white text-black hover:bg-red hover:text-white rounded-[30px]"
          onClick={() => setShowCreateMovieList(true)}
        />
        <CreateMoveList isOpen={showCreateMovieList} onClose={onCloseHandler} />
      </div>
    </AnimatePresence>
  )
}

export default EmptyMovieList
