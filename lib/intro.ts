let introStartMs = 0;

export function setIntroStart(time = performance.now()) {
  introStartMs = time;
}

export function getIntroStart() {
  return introStartMs;
}
