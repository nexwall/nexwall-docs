// The Download button of the top bar opens the release notes download form in the language of the page being read.
export function onRouteDidUpdate(): void {
  const lang = document.documentElement.lang || 'en'
  const wanted = ['es', 'pt-BR'].includes(lang) ? lang : 'en'
  document.querySelectorAll<HTMLAnchorElement>('a.navbar-download').forEach((a) => {
    a.href = `https://releasenotes.nexwall.com.br/download/?lang=${wanted}`
  })
}
