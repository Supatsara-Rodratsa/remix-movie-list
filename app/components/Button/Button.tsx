import clsx from 'clsx'

type ButtonProps = {
  label: string
  type?: 'submit'
  onClick?(): void
  customStyle?: string
}

const Button = ({ label, onClick, type, customStyle }: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'min-w-[100px] rounded-lg bg-red px-4 py-2 text-white transition-all duration-[600ms] hover:bg-white hover:text-black',
        customStyle
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
