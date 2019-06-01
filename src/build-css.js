const fs = require('fs')
const bytes = require('bytes')
const chalk = require('chalk')
const prettyHrtime = require('pretty-hrtime')
const postcss = require('postcss')
const tailwind = require('tailwindcss')
const CleanCSS = require('clean-css')

const buildCSS = filename => {
  return new Promise((resolve, reject) => {
    console.log()
    console.log('🚀', 'Building', chalk.bold.blue(`./src/${filename}.css...`))
    console.log()

    fs.readFile(`./src/${filename}.css`, (err, css) => {
      if (err) throw err

      return postcss([tailwind('./tailwind.config.js')])
        .process(css, {
          from: `./src/${filename}.css`,
          to: `./docs/css/${filename}.css`,
          map: {
            inline: false
          },
        })
        .then(result => {
          const minified = new CleanCSS().minify(result.css)

          fs.writeFileSync(`./docs/css/${filename}.min.css`, minified.styles)
          return (minified)
        })
        .then(minified => resolve(minified.styles))
        .catch(x_x => {
          console.log(x_x)
          reject()
        })
    })
  })
}

(async () => {
  const startTime = process.hrtime()
  const [filename] = process.argv.slice(2)

  const minifiedCSS = await buildCSS(filename)

  const prettyTime = prettyHrtime(process.hrtime(startTime))

  console.log('🎉', 'Finished in', chalk.bold.yellow(prettyTime))
  console.log('📦', 'Size:', chalk.bold.yellow(bytes(minifiedCSS.length)))
  console.log('💾', 'Saved to', chalk.bold.yellow(`docs/css/${filename}.min.css`))
})()
