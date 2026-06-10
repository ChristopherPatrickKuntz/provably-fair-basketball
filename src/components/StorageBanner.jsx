// Shown when the browser is blocking localStorage (private/incognito mode, a
// locked-down device, or exhausted quota). The app is intentionally
// device-dependent and stores nothing off-device, so the only failure mode to
// guard against is losing the current session silently. This makes that loud.
export function StorageBanner() {
  return (
    <div
      role="alert"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#B3261E] text-white shadow-[var(--shadow-elevated)] safe-area-bottom"
    >
      <div className="max-w-lg mx-auto px-4 py-3 flex items-start gap-2.5">
        <span aria-hidden="true" className="text-[16px] leading-none mt-0.5">⚠️</span>
        <p className="text-[13px] leading-snug">
          <strong>Not saving.</strong> This browser is blocking storage (often Private / Incognito
          mode or a locked-down device), so your ratings won't be kept if you refresh or close this
          tab. Switch to a normal browser window to keep your work.
        </p>
      </div>
    </div>
  );
}
