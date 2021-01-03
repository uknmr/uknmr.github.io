const { DateTime, Settings } = require('luxon')
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

  eleventyConfig.addPassthroughCopy({
    "src/css/index.css": "css/index.css",
  })

  Settings.defaultZoneName = 'Asia/Tokyo'

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toISODate()
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
