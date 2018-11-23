const {
  Bookmark,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      // const userId = req.user.id
      // const {songId} = req.body
      const {songId, userId} = req.query
      console.log(req.body)
      console.log(req.body)
      console.log(req.body)
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark))
      res.send(bookmarks)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to fetch the bookmark for a particular song'
        })
    }
  },
  async post (req, res) {
    try {
      // const userId = req.user.id
      // const {songId} = req.body
      const {songId, userId} = req.body
      // Check if it is already in the database
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      // Send 400 error if the bookmark is already exists
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        }) 
      }
      // Otherwise, create a new booknmark
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId       
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
        res.status(500).send({
          error: 'An error has occured trying to create the bookmark'
        })
    }
  },
  async delete (req, res) {
    try {
      // Find the bookmark by Id, destroy it
      const {bookmarkId} = req.params
      console.log('Delete: Grab bookmark id', bookmarkId)
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      // and send the bookmark that was destroyed back to the user
      // if it is successful
      res.send(bookmark)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to delete the bookmark'
        })
    }
  }
}