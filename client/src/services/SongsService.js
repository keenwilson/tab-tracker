import Api from '@/services/Api'

export default {
  // SongsService makes a get request to '/songs' endpoint
  index () {
    return Api().get('songs')
  }
}
