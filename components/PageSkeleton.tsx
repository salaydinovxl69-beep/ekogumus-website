export function PageSkeleton() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8" aria-busy="true" aria-label="Загрузка страницы">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-ekogumus-green/30 border-t-ekogumus-green rounded-full animate-spin" />
        <p className="text-gray-600 font-opensans text-sm">Загрузка…</p>
      </div>
    </div>
  );
}
