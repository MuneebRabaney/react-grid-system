import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  clear: both;
  overflow: hidden;
  ${({ background }) => background && (`
    background: url(${background}) center;
    background-size: cover;
    background-repeat: no-repeat;
  `)}
  ${({ size }) => size && `min-height: ${size}px;`}
  ${({ styles }) => styles}
`
const Inner = styled.div``

const Section = ({ size, background, styles, render, id }) => {
  return (
    <Container
      id={id}
      background={background}
      size={size}
      styles={styles}>
      <Inner>{ render() }</Inner>
    </Container>
  )
}

export default Section
