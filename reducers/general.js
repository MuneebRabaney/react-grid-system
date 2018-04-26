import {
  WINDOW_RESIZE,
} from '@/actions/general'

const win = window
const doc = document
const docEl = doc.documentElement
const body = doc.getElementsByTagName('body')[0]

const initialSate = {
  document: {
    width: win.innerWidth || docEl.clientWidth || body.clientWidth,
    height: win.innerHeight || docEl.clientHeight || body.clientHeight,
    isTablet: false,
    isMobile: false,
  },
  loading: false,
}

const BREAKPOINT_TABLET = process.env.BREAKPOINT_TABLET
const BREAKPOINT_MOBILE = process.env.BREAKPOINT_MOBILE

function general(state = initialSate, action) {

  switch (action.type) {
    case WINDOW_RESIZE:
      const { width, height } = action.data
      return {
        ...state,
        document: {
          width,
          height,
          isTablet: width < BREAKPOINT_TABLET,
          isMobile: width < BREAKPOINT_MOBILE,
        },
      }

    default:
      return state
  }

}

export default general
