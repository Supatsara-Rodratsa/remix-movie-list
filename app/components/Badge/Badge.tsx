type BadgeProps = {
  label: string
}

const Badge = ({ label }: BadgeProps) => {
  return <div className="rounded-3xl bg-red py-1 px-4 text-[12px]">{label}</div>
}

export default Badge
