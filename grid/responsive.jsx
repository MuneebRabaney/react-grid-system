import styled from 'styled-components'
import Display from '@/lib/display'
import { Fragment } from 'react'

const Responsive = (render = { ...props }, {}, Screen = Display.size()) => {
  // Combinations
  return (
    <Fragment>
      {(Screen.desktop && render.desktop)
        && render.desktop()
      }
      {((Screen.tablet.vertical || Screen.tablet.horizontal) && render.tablet)
        && render.tablet()
      }
      {(Screen.mobile && render.mobile)
        && render.mobile()
      }
    </Fragment>
  )
}

export default Responsive
