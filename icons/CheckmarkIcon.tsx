type CheckmarkIconProps = {
  className?: string;
};

export const CheckmarkIcon = ({ className }: CheckmarkIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
    >
      <path
        d="M1.92768 4.61702L5.88227 9.57151L14.0891 1.55292"
        stroke="#005148"
        strokeWidth="2.91302"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
