import { css } from '@emotion/css'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { GetMovieListsQuery, SearchMovie } from '~/generated/graphql'
import Button from '../Button'
import { useState } from 'react'
import UpdateMovieListModal from '../UpdateMovieListModal'
import type { ListItemProps } from '../UpdateMovieListModal/UpdateMovieListModal'

type MovieCardProps = {
  movie: SearchMovie
  currentMovieList?: GetMovieListsQuery['getMovieLists']
  isMovieListItem?: boolean
}

const MovieDetail = ({
  Title,
  Year,
  Type,
}: Pick<SearchMovie, 'Title' | 'Year' | 'Type'>) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <p className="text-[20px] font-light tablet:text-xl">{Title}</p>
        </div>
        <div className="flex items-center justify-between">
          {Type && <p className="text-[14px] capitalize">Type: {Type}</p>}
          {Year && <p className="text-[14px]">Year: {Year}</p>}
        </div>
      </div>
    </div>
  )
}

const MoviePoster = ({
  Poster,
  Title,
}: Pick<SearchMovie, 'Poster' | 'Title'>) => {
  if (Poster && Poster != 'N/A') {
    return (
      <img
        className="h-[inherit] object-cover object-top"
        src={Poster || ''}
        alt={`${Title} Poster`}
        width="100%"
      />
    )
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-black">
      <img
        src="/assets/movie-not-found.png"
        alt="Not Found Poster"
        className="w-[40%]"
      />
      <p className="uppercase">Image Not Found</p>
    </div>
  )
}

const MovieCard = ({
  movie,
  currentMovieList,
  isMovieListItem = false,
}: MovieCardProps) => {
  const [showButton, setShowButton] = useState(false)
  const [showModal, setShowModal] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [movieListStatus, setMovieListStatus] = useState<ListItemProps[]>(
    initMovieStatus()
  )

  function initMovieStatus() {
    if (currentMovieList)
      return currentMovieList.map((movie) => {
        return {
          ...movie,
          status: false,
        }
      })
    return []
  }

  const onCloseHandler = (val: string) => {
    if (val === 'close') setShowModal(false)
  }

  const style = css`
    :before {
      background: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 1)
      );
      content: '';
      width: 100%;
      height: 100%;
      z-index: 9;
      position: absolute;
      transition: all 1s;
    }
  `

  const gradient =
    showButton &&
    css`
      :before {
        background: linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.9),
          rgba(0, 0, 0, 1)
        );
        content: '';
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: all 1s ease-in-out;
      }
    `

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={clsx('relative flex w-fit items-center justify-center')}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div
          onClick={() => {}}
          className={clsx(
            'relative h-[320px] w-[260px] overflow-hidden bg-white',
            style,
            gradient
          )}
        >
          <MoviePoster Poster={movie.Poster} Title={movie.Title} />
          <div className="absolute top-0 z-10 flex h-full w-full items-end p-4">
            <MovieDetail
              Title={movie.Title}
              Year={movie.Year}
              Type={movie.Type}
            />
          </div>
        </div>
        <div
          className={clsx(
            showButton ? 'flex' : 'hidden',
            'absolute top-[50%] left-[50%] z-20 flex w-full -translate-x-[50%] -translate-y-[50%] justify-center transition-all duration-700 ease-in-out'
          )}
        >
          {!isMovieListItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Button
                label="Add to Movie List"
                onClick={() => {
                  setShowModal(true)
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
      <UpdateMovieListModal
        isOpen={showModal}
        onClose={onCloseHandler}
        listItems={movieListStatus}
        currentMovieId={movie.imdbID || ''}
      />
    </>
  )
}

export default MovieCard
