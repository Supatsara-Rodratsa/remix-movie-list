import clsx from 'clsx'

type ButtonProps = {
  label: string
  type?: 'submit'
  onClick?(): void
  bg?: 'red' | 'white' | 'outline'
  variant?: 'small' | 'default'
}

const Button = ({
  label,
  onClick,
  type,
  bg = 'white',
  variant = 'default',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        bg === 'outline' && 'border border-white bg-transparent',
        bg === 'white' && 'bg-white text-black hover:bg-red hover:text-white',
        bg === 'red' && 'bg-red text-white hover:bg-black hover:text-white',
        variant === 'default' && 'py-[6px] px-4 text-base',
        variant === 'small' && 'py-[2px] px-4 text-sm',
        'min-w-[0] rounded-[30px] transition-all duration-[600ms] '
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
