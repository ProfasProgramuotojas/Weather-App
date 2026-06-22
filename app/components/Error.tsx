function Error({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className={
        "fixed inset-0 w-screen h-screen flex justify-center items-center bg-[rgba(251,44,54,0.3)]"
      }
    >
      <div className="flex flex-col items-center justify-center text-red-500">
        <p>It seems you have encountered an Error</p>
        <button className={"hover:cursor-pointer"} onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
}

export default Error;
