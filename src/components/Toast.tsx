export default function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed top-6 right-6 z-[200] animate-slide-in-right">
      <div className="bg-surface border border-success/20 text-success px-6 py-3.5 rounded-xl shadow-[0_4px_12px_rgba(22,163,74,0.1)] flex items-center gap-3 text-[14.5px] font-medium">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/></svg>
        {message}
      </div>
    </div>
  );
}
