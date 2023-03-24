import { css } from '@emotion/css'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { SearchMovie } from '~/generated/graphql'

const MovieDetail = ({
  Title,
  Year,
  Type,
}: Pick<SearchMovie, 'Title' | 'Year' | 'Type'>) => {
  return (
    <div className="flex h-full w-full flex-col justify-end">
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
        src="assets/movie-not-found.png"
        alt="Not Found Poster"
        className="w-[40%]"
      />
      <p className="uppercase">Image Not Found</p>
    </div>
  )
}

const MovieCard = ({ Title, Poster, Year, Type }: SearchMovie) => {
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

    :hover:before {
      background: linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 1)
      );
      content: '';
      width: 100%;
      height: 100%;
      z-index: 10;
      /* position: absolute; */
      transition: all 1s;
    }
  `

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        'relative flex w-fit cursor-pointer items-center justify-center'
      )}
    >
      <div
        onClick={() => {}}
        className={clsx(
          'relative h-[320px] w-[260px] overflow-hidden bg-white',
          style
        )}
      >
        <MoviePoster Poster={Poster} Title={Title} />
        <div className="absolute top-0 z-10 flex h-full w-full items-end p-4">
          <MovieDetail Title={Title} Year={Year} Type={Type} />
        </div>
      </div>
    </motion.div>
  )
}

export default MovieCard
