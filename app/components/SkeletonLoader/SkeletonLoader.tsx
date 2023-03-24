import LoadingCard from '~/components/LoadingCard'

type SkeletonLoaderProps = {
  size: number
}

const SkeletonLoader = ({ size }: SkeletonLoaderProps) => {
  return (
    <div className="grid w-full grid-cols-fill items-center justify-center gap-x-6 gap-y-6">
      {Array.from(Array(size)).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonLoader
