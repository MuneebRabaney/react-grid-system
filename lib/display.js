
class Display {
  /**
   * [size checks the window orientation and returns a booleen depending on the screen width]
   * @param  {null}
   * @return {Object}
  */
  static size() {
    const { innerWidth } = window
    const orientation = {
      desktop: (innerWidth >= 992) ? true : false,
      tablet: {
        vertical: (innerWidth <= 991 && innerWidth >= 768) ? true : false,
        horizontal: (innerWidth == 1024) ? true : false
      },
      mobile: (innerWidth <= 767) ? true : false,
    }
    return orientation
  }
}

export default Display
