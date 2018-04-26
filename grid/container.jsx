import styled from 'styled-components'

const setMaxWidth = ({ innerWidth }) => {
  let width = 'auto'
  switch (innerWidth > 0) {
    case 576 <= innerWidth:
      return width = 540
    case 768 <= innerWidth:
      return width = 720
    case 992 <= innerWidth:
      return width = 960
    case 1200 <= innerWidth:
      return width = 1140
    default:
      return null
  }
  return `max-width: ${width}`
}
const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  ${({ gutters }) => gutters === false && (`
    padding-left: 0;
    padding-right: 0;
  `)}
  ${setMaxWidth(window)}
  ${({ styles }) => styles}
`

export default Container
