"use strict";
(() => {
  // src/hook/useRouter.ts
  function useRouter() {
    let current = window.location.pathname;
    const listeners = /* @__PURE__ */ new Set();
    function notify(path) {
      listeners.forEach((listener) => listener(path));
    }
    function push(path) {
      window.history.pushState({}, "", path);
      current = path;
      notify(current);
    }
    function replace(path) {
      if (path === current) return;
      window.history.replaceState({}, "", path);
      current = path;
      notify(current);
    }
    function onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
    window.addEventListener("popstate", () => {
      current = window.location.pathname;
      notify(current);
    });
    return {
      get path() {
        return current;
      },
      push,
      replace,
      onChange
    };
  }

  // src/main.ts
  function main() {
    const router = useRouter();
    router.push("/test");
    console.log(router.path);
  }
  main();
})();
