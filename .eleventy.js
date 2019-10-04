const { DateTime } = require('luxon')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const postDescending = require('./_collections/post-descending')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk')

  eleventyConfig.addCollection('postDescending', postDescending)

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
  })

  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toISO()
  })

  return {
    dir: {
      output: 'docs',
    },
  }
}
