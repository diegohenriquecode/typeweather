Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    const mql: any = {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
    return mql;
  },
});

if (!('scrollTo' in window)) {
  // @ts-ignore
  window.scrollTo = () => {};
}

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!('ResizeObserver' in window)) {
  // @ts-ignore
  window.ResizeObserver = MockResizeObserver;
}

class MockIntersectionObserver {
  constructor(_cb: any, _opt?: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
if (!('IntersectionObserver' in window)) {
  // @ts-ignore
  window.IntersectionObserver = MockIntersectionObserver;
}
