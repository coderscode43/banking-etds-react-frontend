import { ClipLoader } from "react-spinners";

const Loader = (loading) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-1">
      <ClipLoader
        color={"#29abeb"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="ml-1 text-center text-sm">Loading..</p>
    </div>
  );
};

export default Loader;
