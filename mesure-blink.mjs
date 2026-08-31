import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.evaluateOnNewDocument(() => {
  window.__trace = [];
  const t0 = performance.now();
  const tick = () => {
    const h1 = document.querySelector("h1");
    window.__trace.push({
      t: Math.round(performance.now() - t0),
      o: h1 ? getComputedStyle(h1).opacity : "pas de h1",
    });
    if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.goto("http://localhost:4174/", { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 2800));
const { visible, trace } = await page.evaluate(() => ({
  visible: document.visibilityState,
  trace: window.__trace,
}));

// On resume : premiere frame, puis chaque changement d'opacite.
const resume = [trace[0]];
for (const s of trace) if (s.o !== resume[resume.length - 1].o) resume.push(s);
console.log("visibilityState :", visible, "| frames echantillonnees :", trace.length);
console.log("changements d'opacite du h1 :");
resume.forEach((s) => console.log(`  ${String(s.t).padStart(5)} ms  opacity ${s.o}`));
const zero = trace.filter((s) => s.o === "0").length;
console.log(`\nframes a opacity 0 : ${zero} / ${trace.length}`);
await browser.close();
