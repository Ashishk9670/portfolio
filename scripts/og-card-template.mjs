export function ogCardHtml({ eyebrow, heading, subtext }) {
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
</style>
</head>
<body>
  <div class="wrap">
    <div class="grid"></div>
    <div class="accent-bar"></div>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${heading}</h1>
    <div class="sub">${subtext}</div>
    <div class="footer">
      <div class="name">ashish<span class="dot">.</span>kumar</div>
      <div class="tags">ashishk9670.github.io/portfolio</div>
    </div>
  </div>
</body>
</html>`;
}
