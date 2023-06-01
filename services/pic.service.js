const fs = require('fs')
const axios = require('axios');

let gPics = []
const ITEMS_PER_PAGE = 9

module.exports = {
  query,
  getById,
}

async function query(filterBy, sortBy) {
  const { category, page } = filterBy
  gPics = await _loadPics(filterBy)

  const minifiedPics = gPics.map(pic => {
    return {
      id: pic.id,
      url: pic.webformatURL,
      likes: pic.likes,
      views: pic.views,
      downloads: pic.downloads,
      collections: pic.collections,
      tags: pic.tags,
      webformatHeight: pic.webformatHeight,
      webformatWidth: pic.webformatWidth
    }
  })

  minifiedPics.sort((a, b) => b[sortBy] - a[sortBy])
  return { minifiedPics }
}

async function getById(picId) {
  const pic = await axios.get(
    `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&id=${picId}`)
  return pic.data.hits[0]
}

async function _loadPics({ page, category }) {
  const pics = await axios.get(
    `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&page=${page}&per_page=${ITEMS_PER_PAGE}&q=${category}`)
  return pics.data.hits
}