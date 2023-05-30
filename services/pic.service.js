const fs = require('fs')
const axios = require('axios');

let gPics = []
let gCategory = null
const ITEMS_PER_PAGE = 9

module.exports = {
  query,
}

async function query(filterBy, sortBy) {
  const { category, page } = filterBy
  if (gCategory !== category) {
    gPics = await _loadPics(filterBy)
    gCategory = category
  }

  const totalPages = Math.ceil(gPics.length / ITEMS_PER_PAGE)
  const sortedPics = _sortPics(gPics, sortBy)
  let filteredPics = _pagingPics(sortedPics, page)
  return Promise.resolve({ totalPages, filteredPics })
}

async function _loadPics({ category }) {
  axios.Axios
  const pics = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&per_page=45&q=${category}`)
  return pics.data.hits
}

function _pagingPics(pics, page) {
  const startIdx = (page - 1) * ITEMS_PER_PAGE
  return pics.slice(startIdx, startIdx + ITEMS_PER_PAGE)
}

function _sortPics(pics, sortBy) {
  switch (sortBy) {
    case 'views':
      return pics.sort((a, b) => b.views - a.views)
    case 'downloads':
      return pics.sort((a, b) => b.downloads - a.downloads)
    case 'collections':
      return pics.sort((a, b) => b.collections - a.collections)
    case 'likes':
      return pics.sort((a, b) => b.likes - a.likes)
    default:
      return pics
  }
}
