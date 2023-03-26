type ErrorStateProps = {
  error: Error
}
const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-9">
      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl text-white">
          Oh No, Something went wrong!{' '}
          <pre className="text-base">Error Message: {error.message}</pre>
        </div>
      </div>
    </div>
  )
}

export default ErrorState
