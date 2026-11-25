import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// Browser features that the test environment does not provide.
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = Observer;
globalThis.ResizeObserver = Observer;
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
