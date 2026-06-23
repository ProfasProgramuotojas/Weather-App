import { WarningIcon } from "@/app/components/icons/WarningIcon";

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      data-testid={"error-state"}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <WarningIcon className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-800">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-500">
            It seems you have encountered an Error
          </p>
        </div>
        <button
          className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:cursor-pointer hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
