type ChevronLinkIconProps = {
  className?: string;
};

export const ChevronLinkIcon = ({ className }: ChevronLinkIconProps) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.071 7.70772L1.414 13.3647L0 11.9507L4.95 7.00072L0 2.05072L1.414 0.636719L7.071 6.29372C7.25847 6.48125 7.36379 6.73555 7.36379 7.00072C7.36379 7.26588 7.25847 7.52019 7.071 7.70772Z"
      />
    </svg>
  );
};
