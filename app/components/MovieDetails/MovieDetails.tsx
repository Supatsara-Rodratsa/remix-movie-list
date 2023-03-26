import { css } from '@emotion/css'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { COLORS, ICON } from '~/constants/constants'
import type { IconCategory } from '~/types/types'
import { countingRating } from '~/utils/utilities'
import Badge from '../Badge'
import Button from '../Button'
import Icon from '../Icon'
import type { Movie } from '~/generated/graphql'
import { sdk } from '~/libs/client'
import { useNavigate, useParams } from '@remix-run/react'

type MovieProps = {
  movieDetail: Movie
  children?: ReactNode
}

const MovieCardContainer = ({
  movieDetail,
  children,
}: Pick<MovieProps, 'movieDetail' | 'children'>) => {
  const style = css`
    :before {
      background-image: url(${movieDetail.Poster && movieDetail.Poster !== 'N/A'
        ? movieDetail.Poster
        : '/assets/movie-not-found.png'});
      content: '';
    }
  `
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        'relative flex flex-row items-center justify-center gap-6 overflow-hidden py-[80px]',
        `h-full w-full flex-wrap-reverse before:absolute before:h-[600px] before:w-full before:bg-cover before:bg-no-repeat before:blur-[8rem]`,
        style,
        'mobile:flex-wrap-reverse tablet:flex-wrap-reverse'
      )}
    >
      {children}
    </motion.div>
  )
}

const MovieDetailsContainer = ({ children }: Pick<MovieProps, 'children'>) => {
  return (
    <div className="relative flex w-full flex-col items-center gap-8 py-5 px-20 text-white mobile:px-4 tablet:px-8">
      {children}
    </div>
  )
}

const HeaderContainer = ({ children }: Pick<MovieProps, 'children'>) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {children}
    </div>
  )
}

const ContentContainer = ({ children }: Pick<MovieProps, 'children'>) => {
  return <div className="flex w-full flex-col gap-4">{children}</div>
}

const MovieDescription = ({ Plot }: Pick<Movie, 'Plot'>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="font-bold text-[14]">Plot:</h1>
      <p className="text-base">{Plot}</p>
    </div>
  )
}

const Director = ({ Director }: Pick<Movie, 'Director'>) => {
  return (
    <div className="flex w-full items-center gap-2">
      <h1 className="font-bold text-[14]">Director:</h1>
      <p className="text-base">{Director}</p>
    </div>
  )
}

const Actor = ({ Actors }: Pick<Movie, 'Actors'>) => {
  return (
    <div className="flex w-full items-start gap-2">
      <h1 className="font-bold text-[14]">Actors:</h1>
      <p className="text-base">{Actors}</p>
    </div>
  )
}

const Genre = ({ Genre }: Pick<Movie, 'Genre'>) => {
  return (
    <div className="flex flex-wrap items-start gap-2 ">
      <h1 className="font-bold text-[14]">Genre: </h1>
      {Genre?.split(', ').map((item: string, i: number) => (
        <Badge key={i} label={item} />
      ))}
    </div>
  )
}

const Writer = ({ Writer }: Pick<Movie, 'Writer'>) => {
  return (
    <div className="flex flex-wrap items-start gap-2 ">
      <h1 className="font-bold text-[14]">Writer: </h1>
      <p className="text-base">{Writer}</p>
    </div>
  )
}

const Rated = ({ Rated }: Pick<Movie, 'Rated'>) => {
  return (
    <div className="flex flex-wrap items-start gap-2 ">
      <h1 className="font-bold text-[14]">Rated: </h1>
      <p className="text-base">{Rated}</p>
    </div>
  )
}

const Release = ({ Released }: Pick<Movie, 'Released'>) => {
  return (
    <div className="flex w-full items-center gap-2">
      <h1 className="font-bold text-[14]">Released:</h1>
      <p className="text-base">{Released}</p>
    </div>
  )
}

const Year = ({ Year }: Pick<Movie, 'Year'>) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size="18px" type={ICON.CALENDAR} color={COLORS.RED} />
      <p className="text-center text-base">{Year}</p>
    </div>
  )
}

const Rating = ({ imdbRating }: Pick<Movie, 'imdbRating'>) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size="20px" type={ICON.RATING} color={COLORS.RED} />
      <p className="text-base">{`${imdbRating} / 10` || '-'}</p>
    </div>
  )
}

const IconDetails = ({ children }: Pick<MovieProps, 'children'>) => {
  return <div className="flex items-center gap-8">{children}</div>
}

const renderStar = (starType: IconCategory, i: number) => {
  return <Icon key={i} type={starType} color="red" size="24px" />
}

const MovieStar = ({ imdbRating }: Pick<Movie, 'imdbRating'>) => {
  if (imdbRating) {
    const stars: string[] = countingRating(parseInt(imdbRating))
    return (
      <div className="-mt-2 flex gap-1">
        {stars.map((star: string, i: number) =>
          renderStar(star as IconCategory, i)
        )}
      </div>
    )
  }

  return <></>
}

const MovieDetails = ({ movieDetail }: MovieProps) => {
  const { myListId, itemId } = useParams()
  const navigate = useNavigate()

  const onHandlerRemoveMovieItem = async () => {
    if (itemId && myListId) {
      const { removeMovie } = await sdk.RemoveMovie({
        listId: parseInt(myListId),
        removeMovieId: parseInt(itemId),
      })

      if (removeMovie) {
        navigate(`/my-lists/${myListId}`)
      }
    }
  }

  return (
    <MovieCardContainer movieDetail={movieDetail}>
      <MovieDetailsContainer>
        <HeaderContainer>
          <h1 className="text-center text-3xl font-normal uppercase">
            {movieDetail.Title}
          </h1>
          <MovieStar imdbRating={movieDetail.imdbRating} />
          <IconDetails>
            <Year Year={movieDetail.Year} />
            <Rating imdbRating={movieDetail.imdbRating} />
          </IconDetails>
        </HeaderContainer>
        <Button
          label="Remove from Movie List"
          onClick={onHandlerRemoveMovieItem}
        />
        <ContentContainer>
          <Director Director={movieDetail.Director} />
          <Rated Rated={movieDetail.Rated} />
          <Actor Actors={movieDetail.Actors} />
          <Genre Genre={movieDetail.Genre} />
          <Release Released={movieDetail.Released} />
          <Writer Writer={movieDetail.Writer} />
        </ContentContainer>
        <MovieDescription Plot={movieDetail.Plot} />
      </MovieDetailsContainer>
    </MovieCardContainer>
  )
}

export default MovieDetails
