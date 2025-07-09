import { PuffLoader } from "react-spinners";

function LoaderComponent() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <PuffLoader color="white" />
      <h1 className="text-white! text-md mt-1">Đang lấy dữ liệu...</h1>
    </div>
  );
}

export default LoaderComponent;
