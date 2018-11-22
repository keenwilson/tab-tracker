module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {})

  // Build associate between the user and the song with the bookmark
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Song)
  }
  return Bookmark
}