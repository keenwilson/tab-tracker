const { Song } = require('../models')

module.exports = {
  // Find all songs in the dayabase
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to fetch the songs'
        })
    }
  },
  // A post method to create song
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to create the song'
        })
    }
  }
}