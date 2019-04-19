const {
  DateTime
} = require('luxon')

const translateDate = relativeDate => {
  return relativeDate
    .replace(/(?:in )?(\d+) second ago/, '$1 秒前')
    .replace(/(?:in )?(\d+) seconds ago/, '$1 秒前')
    .replace(/(?:in )?(\d+) minute ago/, '$1 分前')
    .replace(/(?:in )?(\d+) minutes ago/, '$1 分前')
    .replace(/(?:in )?(\d+) hour ago/, '$1 時間前')
    .replace(/(?:in )?(\d+) hours ago/, '$1 時間前')
    .replace(/(?:in )?(\d+) day ago/, '$1 日前')
    .replace(/(?:in )?(\d+) days ago/, '$1 日前')
    .replace(/(?:in )?(\d+) month ago/, '$1 月前')
    .replace(/(?:in )?(\d+) months ago/, '$1 月前')
    .replace(/(?:in )?(\d+) year ago/, '$1 年前')
    .replace(/(?:in )?(\d+) years ago/, '$1 年前')
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  eleventyConfig.addFilter('readableDate', dateObj => {
    const relativeDate = DateTime.fromJSDate(dateObj).toRelative()
    return translateDate(relativeDate)
  })

  return {}
}