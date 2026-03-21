interface Source {
  name: string;
  count: number;
  color: string;
}

interface ReviewSourcesProps {
  sources: Source[];
  totalReviews: number;
}

export function ReviewSources({ sources, totalReviews }: ReviewSourcesProps) {
  const maxCount = Math.max(...sources.map((s) => s.count));

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">Review Sources</h3>
      <div className="flex flex-col gap-4">
        {sources.map((source) => {
          const pct = Math.round((source.count / totalReviews) * 100);
          const barWidth = (source.count / maxCount) * 100;
          return (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#94A3B8]">{source.name}</span>
                <span className="text-sm font-semibold text-[#F8FAFC]">
                  {source.count}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#334155] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${barWidth}%`, backgroundColor: source.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}