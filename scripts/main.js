const addFont = fontURI => {
  const referenceNode = document.getElementsByTagName('link')[0]
  const newNode = document.createElement('link')
  newNode.rel = 'stylesheet'
  newNode.href = `https://fonts.googleapis.com/css?family=${fontURI}&display=swap`
  referenceNode.parentNode.insertBefore(newNode, referenceNode)
}

;(() => {
  if (!navigator || !navigator.connection) {
    return
  }

  const { saveData, effectiveType } = navigator.connection

  if (saveData || effectiveType !== '4g') {
    return
  }

  addFont('Noto+Sans+JP:900|Noto+Serif+JP')
  addFont('Space+Mono:400i&text=acefinorstuvwy')
})()
