export function navigateTo(pathname: string) {
  window.history.pushState(null, '', pathname);
}
