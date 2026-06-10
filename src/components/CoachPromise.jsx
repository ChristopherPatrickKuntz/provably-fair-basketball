export function CoachPromise({ onAccept, onBack }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-5">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-[15px] font-medium text-[#a1a1aa] hover:text-white py-1"
        >
          ← Home
        </button>
      )}
      <div className="max-w-md w-full text-center space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-[28px] font-bold text-[#facc15] mb-2">
            THE COACH'S PROMISE
          </h1>
          <p className="text-[15px] text-[#a1a1aa]">
            Before you use this system, read this.
          </p>
        </div>

        {/* Philosophy */}
        <div className="space-y-1">
          <p className="text-[17px] text-white/90">This isn't about winning games.</p>
          <p className="text-[17px] text-white font-medium">It's about building people.</p>
        </div>

        {/* Commitments */}
        <div className="text-left space-y-4 py-4">
          <p className="text-[13px] text-[#a1a1aa] uppercase tracking-wide text-center mb-4">
            By using Provably Fair Basketball, I commit to:
          </p>
          
          <PromiseItem text="Coaching the person before the player" />
          <PromiseItem text="Making effort the standard, not talent" />
          <PromiseItem text="Treating mistakes as learning, not failure" />
          <PromiseItem text="Being calm, clear, and steady" />
          <PromiseItem text="Never embarrassing a kid" />
          <PromiseItem text="Placing every child where they can grow" />
        </div>

        {/* Closing */}
        <div className="space-y-2 pt-4">
          <p className="text-[15px] text-[#a1a1aa]">
            Kids remember how a coach makes them feel.
          </p>
          <p className="text-[17px] text-white font-medium">
            That's the real win.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onAccept}
          className="w-full py-4 bg-[#facc15] text-[#0a0a0b] rounded-[14px] text-[17px] font-bold mt-4 hover:bg-[#fcd34d] transition-colors"
        >
          I COMMIT TO THIS
        </button>
      </div>
    </div>
  );
}

function PromiseItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5 text-[#facc15] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[15px] text-white">{text}</span>
    </div>
  );
}
