type PlayIconProps = {
  className?: string;
};

export const PlayIcon = ({ className }: PlayIconProps) => {
  return (
    <svg
      className={className}
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9852 5.60024C11.7491 6.07596 11.7491 7.22503 10.9852 7.70075L2.65829 12.8863C1.87175 13.3761 0.871094 12.7881 0.871094 11.836L0.871094 1.46496C0.871094 0.51294 1.87175 -0.0750977 2.65829 0.414714L10.9852 5.60024Z"
        fill="#212121"
      />
    </svg>
  );
};
