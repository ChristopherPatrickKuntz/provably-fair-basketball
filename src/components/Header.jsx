export function Header({ 
  title, 
  subtitle,
  leftAction,
  leftLabel = '← Back',
  rightAction,
  rightLabel,
  rightVariant = 'text' // 'text' | 'primary'
}) {
  return (
    <header className="bg-[var(--bg-card)] shadow-[var(--shadow-card)] px-4 py-3 sticky top-0 z-10">
      <div className="max-w-lg mx-auto flex items-center min-h-[44px]">
        {/* Left */}
        <div className="min-w-[70px]">
          {leftAction && (
            <button
              onClick={leftAction}
              className="text-[var(--accent)] text-[15px] font-medium py-1 whitespace-nowrap"
            >
              {leftLabel}
            </button>
          )}
        </div>

        {/* Center */}
        <div className="flex-1 text-center px-2">
          <h1 className="text-[17px] font-semibold text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <div className="text-[13px] text-[var(--text-muted)]">
              {subtitle}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="min-w-[70px] flex justify-end">
          {rightAction && rightLabel && (
            <button
              onClick={rightAction}
              className={`text-[15px] font-semibold py-1.5 px-3 rounded-[8px] whitespace-nowrap ${
                rightVariant === 'primary'
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--accent)]'
              }`}
            >
              {rightLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
