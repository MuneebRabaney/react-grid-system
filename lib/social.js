let instance = null

class Social {

  facebook = null
  userId = null
  token = null

  static shared () {
    if (!instance) {
      instance = new Social()
    }
    return instance
  }

}

export default Social
