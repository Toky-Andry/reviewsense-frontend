interface KeywordCloudProps {
  keywords: string[];
}

const SIZES = [
  "text-3xl font-black text-blue-400",
  "text-2xl font-bold text-[#F8FAFC]",
  "text-xl font-bold text-[#94A3B8]",
  "text-lg font-semibold text-blue-300",
  "text-base font-semibold text-[#F8FAFC]",
  "text-sm font-medium text-[#94A3B8]",
  "text-xs font-medium text-[#94A3B8]",
];

export function KeywordCloud({ keywords }: KeywordCloudProps) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 h-full">
      <h3 className="text-sm font-semibold text-[#F8FAFC] mb-4">Top Keywords</h3>
      <div className="flex flex-wrap gap-3 items-center justify-center py-4">
        {keywords.map((keyword, i) => (
          <span
            key={keyword}
            className={SIZES[i % SIZES.length]}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}