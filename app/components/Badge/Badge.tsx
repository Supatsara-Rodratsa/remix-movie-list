type BadgeProps = {
  label: string;
};

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="py-1 px-4 text-[12px] bg-red rounded-3xl">{label}</div>
  );
};

export default Badge;
