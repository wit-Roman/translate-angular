export function clearAdv() {
  //реклама
  const selector = document.querySelector(
    'body > div[style*="z-index: 999999999"]'
  );
  // @ts-ignore
  if (selector) selector.style.display = "none";

  const selector2 = document.querySelector(
    'body div div[style*="z-index: 99999"]'
  );
  // @ts-ignore
  if (selector2) selector2.style.display = "none";
  //selector2?.remove();

  setTimeout(() => {
    const selector2 = document.querySelector(
      'body div div[style*="z-index: 99999"]'
    );
    // @ts-ignore
    if (selector2) selector2.style.display = "none";
  }, 1000);
}
