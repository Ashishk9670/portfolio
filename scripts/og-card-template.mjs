export function ogCardHtml({ eyebrow, heading, subtext, stats = [], badge }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1200px;
    height: 630px;
    background: #0a0a0a;
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    overflow: hidden;
  }
  .wrap {
    width: 1200px;
    height: 630px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 90px;
  }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(45, 212, 191, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 212, 191, 0.07) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, black, transparent 85%);
  }
  .accent-bar { width: 64px; height: 6px; background: #2dd4bf; border-radius: 3px; margin-bottom: 32px; }
  .eyebrow {
    font-family: "JetBrains Mono", "Courier New", monospace;
    font-size: 26px;
    color: #2dd4bf;
    margin-bottom: 20px;
    letter-spacing: 0.02em;
  }
  h1 { font-size: 58px; font-weight: 700; color: #f2f2f2; line-height: 1.15; max-width: 950px; letter-spacing: -0.02em; }
  .sub { margin-top: 28px; font-size: 26px; color: #a3a3a3; max-width: 820px; line-height: 1.5; }
  .footer { position: absolute; bottom: 70px; left: 90px; right: 90px; display: flex; justify-content: space-between; align-items: center; }
  .name { font-family: "JetBrains Mono", "Courier New", monospace; font-size: 24px; color: #f2f2f2; }
  .name .dot { color: #2dd4bf; }
  .tags { font-family: "JetBrains Mono", "Courier New", monospace; font-size: 20px; color: #5b6472; }
  .wrap.has-stats { padding: 40px 90px 70px; }
  .wrap.has-stats .accent-bar { margin-bottom: 24px; }
  .wrap.has-stats .eyebrow { margin-bottom: 14px; }
  .wrap.has-stats h1 { font-size: 50px; }
  .wrap.has-stats .sub { margin-top: 16px; font-size: 23px; }
  .wrap.has-stats .footer { bottom: 40px; }
  .badge {
    position: absolute; top: 56px; right: 90px;
    display: flex; align-items: center; gap: 10px;
    border: 1px solid rgba(45, 212, 191, 0.45); border-radius: 999px;
    padding: 10px 20px; font-size: 20px; color: #d4d4d4;
  }
  .badge .pulse { width: 12px; height: 12px; border-radius: 50%; background: #2dd4bf; }
  .stats { display: flex; gap: 20px; margin-top: 30px; }
  .stat { flex: 1; border: 1px solid #262626; border-radius: 12px; padding: 16px 20px; background: rgba(20, 20, 20, 0.85); }
  .stat .value { font-size: 32px; white-space: nowrap; font-weight: 700; color: #2dd4bf; letter-spacing: -0.01em; }
  .stat .label { margin-top: 6px; font-size: 17px; color: #a3a3a3; line-height: 1.35; }
</style>
</head>
<body>
  <div class="wrap${stats.length ? " has-stats" : ""}">
    <div class="grid"></div>
    ${badge ? `<div class="badge"><span class="pulse"></span>${badge}</div>` : ""}
    <div class="accent-bar"></div>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${heading}</h1>
    <div class="sub">${subtext}</div>
    ${
      stats.length
        ? `<div class="stats">${stats
            .map((s) => `<div class="stat"><div class="value">${s.value}</div><div class="label">${s.label}</div></div>`)
            .join("")}</div>`
        : ""
    }
    <div class="footer">
      <div class="name">ashish<span class="dot">.</span>kumar</div>
      <div class="tags">ashishk9670.github.io/portfolio</div>
    </div>
  </div>
</body>
</html>`;
}
