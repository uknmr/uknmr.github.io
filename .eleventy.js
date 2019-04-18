module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  return {}
}