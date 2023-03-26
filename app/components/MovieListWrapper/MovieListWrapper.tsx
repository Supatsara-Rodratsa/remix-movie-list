import { useState } from 'react'
import EmptyMovieList from '~/components/EmptyMovieList'
import type { GetMovieListsQuery, MovieList } from '~/generated/graphql'
import MovieListItem from '../MovieListItem'
import { Reorder, motion } from 'framer-motion'
import clsx from 'clsx'
import Button from '../Button'
import CreateMoveList from '../CreateMovieList'
import { sdk } from '~/libs/client'

type MovieListWrapperProps = {
  movieList: GetMovieListsQuery['getMovieLists']
}

type CreateNewMovieListProps = {
  getNewMovieList: (newMovieList: Pick<MovieList, 'id' | 'name'>) => void
  movieList: GetMovieListsQuery['getMovieLists']
}

const CreateNewMovieList = ({
  getNewMovieList,
  movieList,
}: CreateNewMovieListProps) => {
  const [showModal, setShowModal] = useState(false)

  const onCloseHandler = (val: string) => {
    if (val === 'close') {
      setShowModal(false)
    }
  }

  const onCreateModalHandler = () => {
    if (!showModal) setShowModal(true)
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-8 px-4 py-4"
      onClick={onCreateModalHandler}
    >
      <div
        className={clsx(
          'flex h-[24px] w-[24px] items-center justify-center rounded-full text-2xl'
        )}
      >
        +
      </div>
      <p className={clsx('text-lg')}>Create New Movie List</p>
      <CreateMoveList
        isOpen={showModal}
        onClose={onCloseHandler}
        updateNewMovieListValue={getNewMovieList}
        movieList={movieList.map((movie) => movie.name.toLowerCase()) || []}
      />
    </div>
  )
}

const MovieListWrapper = ({ movieList }: MovieListWrapperProps) => {
  const [movieLists, setMovieLists] = useState([...movieList])
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const onUpdateMovieListHandler = (
    newMovieList: Pick<MovieList, 'id' | 'name'>
  ) => {
    movieLists.push(newMovieList)
    setMovieLists([...movieLists])
    setIsEdit(false)
  }

  const onRemoveItemHandler = async (id: number) => {
    if (isEdit) {
      const { deleteList } = await sdk.RemoveMovieList({
        deleteListId: id,
      })

      if (deleteList) {
        const findId = movieLists.findIndex((item) => item.id === id)

        if (findId !== -1) {
          movieLists.splice(findId, 1)
          setMovieLists([...movieLists])
        }
      }
    }
  }

  if (movieLists.length === 0) {
    return <EmptyMovieList updateNewMovieList={onUpdateMovieListHandler} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-2xl">Your Movie List</h1>
        <div className="mt-[2px]">
          <Button
            label={isEdit ? 'Done' : 'Edit'}
            bg="outline"
            variant="small"
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>
      </div>

      <div className="flex min-w-[calc(50vw)] flex-col">
        <Reorder.Group
          axis="y"
          values={movieLists}
          onReorder={setMovieLists}
          layout="position"
        >
          {movieLists.map((item, i) => (
            <Reorder.Item key={item.id} value={item} dragListener={!isEdit}>
              <MovieListItem
                id={item.id}
                name={item.name}
                index={i + 1}
                isEdit={isEdit}
                isLastItem={movieLists.length === i + 1}
                onRemoveItem={() => onRemoveItemHandler(item.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        {!isEdit && (
          <CreateNewMovieList
            getNewMovieList={onUpdateMovieListHandler}
            movieList={movieList}
          />
        )}
      </div>
    </motion.div>
  )
}

export default MovieListWrapper
