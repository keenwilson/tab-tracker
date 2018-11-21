const { Song } = require('../models')

module.exports = {
  // Find all songs in the database
  async index (req, res) {
    try {
      // Set songs to null so that we can assign it based on which path we take
      let songs = null
      const search = req.query.search
      // Check if search is set in a query string, do the search
      if (search) {
        // Find all the songs which matches any of these cases
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              // Create a giant array of objects
              [key]: {
                // Find anything
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to fetch the songs'
        })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to show the song'
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
  },
  async put (req, res) {
    try {
      console.log('server will put song id ' + req.params.songId)
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      // return the same song we uploaded
      res.send(req.body)
    } catch (err) {
        res.status(500).send({
          error: 'An error has occured trying to update the song'
        })
    }
  }
}