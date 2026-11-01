/**
 * Server-rendered SVG bar chart: registered vs passed per year.
 */
export function ResultsChart({
  data,
  title,
  labels,
}: {
  data: readonly { year: number; registered: number; passed: number }[];
  title: string;
  labels: { registered: string; passed: string; passPct: string };
}) {
  const max = Math.max(...data.map((d) => d.registered)) || 1;
  const H = 160;
  const barW = 22;
  const gap = 10;
  const groupW = barW * 2 + gap;
  const pad = 24;
  const W = pad * 2 + data.length * (groupW + 34);

  return (
    <figure className="card p-5">
      <figcaption className="font-semibold text-brand-deep">{title}</figcaption>
      <div className="mt-3 overflow-x-auto">
        <svg
          role="img"
          aria-label={title}
          viewBox={`0 0 ${W} ${H + 48}`}
          className="min-w-[300px] w-full"
        >
          {data.map((d, i) => {
            const x0 = pad + i * (groupW + 34);
            const hReg = (d.registered / max) * H;
            const hPass = (d.passed / max) * H;
            const pct = Math.round((d.passed / d.registered) * 1000) / 10;
            return (
              <g key={d.year}>
                <rect
                  x={x0}
                  y={H - hReg}
                  width={barW}
                  height={hReg}
                  rx={4}
                  fill="#f3de9b"
                />
                <rect
                  x={x0 + barW + gap}
                  y={H - hPass}
                  width={barW}
                  height={hPass}
                  rx={4}
                  fill="#7b1e7b"
                />
                <text
                  x={x0 + groupW / 2}
                  y={H + 18}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#575061"
                >
                  {d.year}
                </text>
                <text
                  x={x0 + groupW / 2}
                  y={H + 34}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#4a0f4a"
                >
                  {pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex gap-5 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-gold" />
          {labels.registered}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-brand" />
          {labels.passed}
        </span>
      </div>
    </figure>
  );
}
