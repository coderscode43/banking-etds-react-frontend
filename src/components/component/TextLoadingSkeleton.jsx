const TextLoadingSkeleton = ({
  width = "200px",
  height = "32px",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded bg-gray-300 ${className}`}
      style={{ width, height }}
    >
      <div className="animate-shimmer absolute top-0 left-0 h-full w-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300"></div>
    </div>
  );
};

export default TextLoadingSkeleton;
