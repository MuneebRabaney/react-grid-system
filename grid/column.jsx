import styled from 'styled-components'
import Display from '@/lib/display'

const screenEnums = {
  desktop: Display.size().desktop,
  tablet: Display.size().tablet.horizontal || Display.size().tablet.vertical,
  mobile: Display.size().mobile
}

const calculateGridWidth = fill => {
  const startFill = 8.333333
  return startFill * fill
}

const calculateDisplayColumnOffset = (offset, { style }) => {
  return Object.keys(screenEnums).map(value => {
    if (screenEnums[value] && offset[value]) {
      if (style) {
        // returns the calculation embeded in the css
        return `
          margin-left: ${calculateGridWidth(offset[value])}%;
        `
      }
      // returns just the calculation
      return calculateGridWidth(offset[value])
    }
  })
}

const calculateDisplayGridWidth = (fill, { style }) => {

  return Object.keys(screenEnums).map(value => {
    if (screenEnums[value] && fill[value]) {
      if (style) {
        // returns the calculation embeded in the css
        if (fill[value] === 'auto') {
          return `
            -webkit-box-flex: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            width: auto;
            max-width: none;
          `
        }
        if (fill[value] <= 12) {
          return `
            -webkit-box-flex: 0;
            -ms-flex: 0 0 ${calculateGridWidth(fill[value])}%;
            flex: 0 0 ${calculateGridWidth(fill[value])}%;
            max-width: ${calculateGridWidth(fill[value])}%;
          `
        }
        // returns just the calculation
        return calculateGridWidth(fill[value])
      }
    }
  })
}

const calculateColumnOrder = order => {
  switch (order) {
    case 'first':
    return `
      -webkit-box-ordinal-group: 0;
      -ms-flex-order: -1;
      order: -1;
    `
    case 'last':
      return `
        -webkit-box-ordinal-group: 14;
        -ms-flex-order: 13;
        order: 13;
      `
    default:
      return `
        -webkit-box-ordinal-group: ${++order};
        -ms-flex-order: ${order};
        order: ${order};
      `
  }
}

const Column = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-flex: 100%;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  ${({ flip }) => flip && `
    float: right;
  `}
  ${({ gutters }) => (gutters === false) && (`
    padding-right: 0;
    padding-left: 0;
  `)}
  ${({ fill }) => (typeof fill === 'object') &&
    calculateDisplayGridWidth(fill, {
      style: true
    })
  }
  ${({ offset }) => (typeof offset === 'object') &&
    calculateDisplayColumnOffset(offset, {
      style: true
    })
  }
  ${({ order }) => order && calculateColumnOrder(order) }
  ${({ styles }) => styles }
`

export default Column
