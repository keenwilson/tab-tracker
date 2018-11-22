const {
  Bookmark
} = require('../models')

module.exports = {
  // Allow user to search a particular bookmark based on the song id
  // GET http://localhost:8081/bookmarks?songId=1
  async index (req, res) {
    try {
      // Grab songId from the query string
      const {songId, userId} = req.query
      console.log('Grab song id', songId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to fetch a bookmark for a particular song'
        })
    }
  },
  async post (req, res) {
    try {
      // Grab bookmark from the request
      const {songId, userId} = req.body
      console.log(req.body)
      console.log(`req.body.songId: ${req.body.songId}, req.body.userId: ${req.body.userId}`)
      console.log(`Post: find existing bookmark of songId: ${songId} and userId: ${userId}`)
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