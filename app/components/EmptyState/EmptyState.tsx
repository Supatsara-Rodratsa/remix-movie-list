const EmptyState = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-9">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-white">Data Not Found</h1>
        <h1 className="text-4xl text-white">😬</h1>
      </div>
    </div>
  )
}

export default EmptyState
