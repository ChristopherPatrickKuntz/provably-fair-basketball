export function RatingSegmentedControl({ value, onChange }) {
  const options = [
    { value: null, label: 'Skip', color: null },
    { value: 1, label: 'Needs Work', color: 'var(--rating-needs-work)' },
    { value: 2, label: 'OK', color: 'var(--rating-ok)' },
    { value: 3, label: 'Good', color: 'var(--rating-good)' }
  ];

  return (
    <div className="flex bg-[var(--bg-secondary)] rounded-[10px] p-1 gap-1">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.label}
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
            className={`
              flex-1 py-2 px-2 rounded-[8px] text-[13px] font-medium transition-all duration-200
              ${isSelected 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-white/50'
              }
            `}
            style={{
              color: isSelected && option.color ? option.color : 'var(--text-secondary)'
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
