export default function Load() {
  return (
    <div className="h-[100vh] flex flex-col bg-white dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-brand-80 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
