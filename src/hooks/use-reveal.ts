import { useEffect } from "react";

/**
 * Fades `.reveal` elements in as they scroll into view.
 * Watches the page for newly added sections (pages load in after navigation),
 * so content on every page gets revealed — never left hidden.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible):not([data-reveal-watched])").forEach((el) => {
        el.dataset["revealWatched"] = "";
        io.observe(el);
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
