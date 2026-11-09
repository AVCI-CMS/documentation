/**
 * Global fallback for window.gtag.
 * Prevents "TypeError: window.gtag is not a function" when an ad blocker
 * blocks Google Analytics or in development / non-production environments.
 */
if (typeof window !== 'undefined') {
  if (typeof (window as unknown as { gtag?: unknown }).gtag !== 'function') {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag = function () {
      // Safe no-op when analytics is blocked or disabled
    };
  }
}

export default {};

