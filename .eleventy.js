const {
  DateTime
} = require('luxon')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk')

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
  })

  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toISO()
  })

  return {
    dir: {
      output: 'docs'
    }
  }
}
