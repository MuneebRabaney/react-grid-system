import social from '@/lib/social'
import _ from 'lodash'
var Promise = require('bluebird').config({
  // longStackTraces: false,
  // warnings: false
})

class Facebook {
  constructor () {
    let loggedIn = false
  }

  getAlbums () {
    return new Promise((resolve, reject) => {
      // login the user
      return this.getLoginStatus()
      .then(() => {
        // get a list of the users albums
        return this.getAlbumsList()
        .then(albumsList => {
          // get the cover image for each album
          return Promise.each(albumsList.data, (album) => {
            return this.getAlbumCoverImage(album.id)
            .then((coverImage) => {
              album.coverImage = coverImage
            })
            .catch(err => reject(err))
          })
          .then(albumsList => {
            // get the list of photos for each album
            return Promise.each(albumsList, (album) => {
              return this.getAlbumImages(album.id)
              .then((images) => {
                album.images = images
              })
              .catch(err => reject(err))
            })
            .then(albumsList => {
              // we are done
              resolve(albumsList)
            })
            .catch(err => reject(err))
          })
          .catch(err => reject(err))
        })
        .catch(err => reject(err))
      })
      .catch(err => reject(err))
    })
  }

  getAlbumCoverImage (galleryId) {
    return new Promise((resolve, reject) => {
      social.facebook.api(`${galleryId}/picture`, {
        access_token: social.token
      }, response => {
        resolve(response)
      })
    })
  }

  getAlbumImages (galleryId) {
    return new Promise((resolve, reject) => {
      social.facebook.api(`${galleryId}/photos`, {
        access_token: social.token
      }, response => {
        // fetch image data for album images
        const images = response.data
        return Promise.each(images, (image) => {
          return this.getImage(image.id)
          .then(result => {
            image.url = result.images[0].source
            image.width = result.images[0].width
            image.height = result.images[0].height
          })
          .catch(err => console.log(err))
        })
        .then(images => resolve(images))
        .catch(err => console.log(err))
      })
    })
  }

  getImage (imageId) {
    return new Promise((resolve, reject) => {
      social.facebook.api(`${imageId}?fields=images`, {
        access_token: social.token
      }, response => {
        resolve(response)
      })
    })
  }

  getAlbumsList () {
    return new Promise((resolve, reject) => {
      social.facebook.api('/me/albums', {
        access_token: social.token
      }, response => {
        resolve(response)
      })
    })
  }

  debugToken (inputToken) {
    return new Promise((resolve, reject) => {
      social.facebook.api(`debug_token?input_token=${inputToken}`, response => {
        resolve(response)
      })
    })
  }

  getLoginStatus () {
    return new Promise((resolve, reject) => {
      social.facebook.getLoginStatus(response => {
        if (response.status === 'connected') {
          // return this.debugToken(social.token)
          // .then(result => {
          //   if (result.data.is_valid) {
          //     resolve(result)
          //   } else {
          //     reject('The user token is not valid: ' + result)
          //   }
          // })
          resolve()
        } else if (response.status === 'not_authorized') {
          reject('The user is logged in to Facebook, but has not authenticated your app.')
        } else {
          reject('The user isnt logged in to Facebook.')
        }
      })
    })
  }

  login () {
    return new Promise((resolve, reject) => {
      social.facebook.login(response => {
        if (response.status === 'connected') {
          social.userId = response.authResponse.userID
          social.token = response.authResponse.accessToken
          resolve()
          // return this.debugToken(social.token)
          // .then(result => {
            // if (result.data.is_valid) {
            //   resolve(result)
            // } else {
            //   reject('The user token is not valid: ' + result)
            // }
          // })
          // .catch(err => reject(err))
        } else if (response.status === 'not_authorized') {
          reject('The user is logged in to Facebook, but has not authenticated your app.')
        } else {
          reject('The user isnt logged in to Facebook.')
        }
      }, {
        scope: 'user_photos',
        return_scopes: true
      })
    })
  }

  share (params) {
    return new Promise((resolve, reject) => {
      social.facebook.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'og:url': params.FBLink,
            'og:title': params.FBTitle,
            'og:description': params.FBDesc,
            'og:image': params.FBPic
          }
        })
      }, (response) => {
        if (response && !response.error) {
          resolve()
        } else {
          reject(response.error)
        }
      })
    })
  }

}

export default Facebook
