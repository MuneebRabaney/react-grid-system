import axios from '@/lib/request'
import Promise from 'bluebird'

export const WINDOW_RESIZE = 'WINDOW_RESIZE'

export function windowResize(data) {
  return {
    type: WINDOW_RESIZE,
    data,
  }
}
