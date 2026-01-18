export default function SkeletonSlide() {
  return (
    <div className="flex flex-col gap-6 border mt-2 border-gray-200 rounded-lg p-8 bg-white shadow-md animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-24 w-full bg-gray-200 rounded"></div>
        <div className="flex items-start gap-3 ml-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
          <div className="h-5 flex-1 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-start gap-3 ml-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
          <div className="h-5 flex-1 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-start gap-3 ml-2">
          <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
