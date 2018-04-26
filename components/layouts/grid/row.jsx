import styled, { css } from 'styled-components'

const Row = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  ${({ center }) => center && (`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `)}
  ${({ bottom }) => bottom && (`
    width: 100%;
    position: absolute;
    bottom: 0;
    top: auto;
  `)}
  ${({ gutters }) => (gutters === false) && (`
    margin-right: 0;
    margin-left: 0;
  `)}
`

export default Row
