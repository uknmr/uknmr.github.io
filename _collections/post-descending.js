module.exports = collection =>
  collection.getFilteredByTag("post").filter(item => item.data.permalink);
