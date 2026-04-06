interface BadgeProps {
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
      {label}
    </span>
  );
};

export default Badge;
