import posed from 'react-pose'
import styled from 'styled-components'

const PosedWrapper = posed.div({
    init: {
        x: '-280px',
        transition: {
            duration: 300,
            ease: [0.17, 0.81, 0.32, 0.94]
        }
    },
    active: {
        x: '0px',
        transition: {
            duration: 300,
            ease: [0.17, 0.81, 0.32, 0.94]
        }
    }
})

export const Wrapper = styled.div`
    width: 280px;
    height: 100vh;
    z-index: 10;
    top: 0;

    ${'' /* position: absolute; */}

    background-color: #333;
`

export const ArrowContainer = styled.div`
    position: absolute;
    width: 50px;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;

    cursor: pointer;

    background-color: #222;
`

const PosedArrow = posed.img({
    init: {
        rotateZ: '0deg'
    },
    active: {
        rotateZ: '180deg'
    }
})

export const Arrow = styled(PosedArrow)`
    color: #fff;
    font-family: 'ProductSans';

    position: absolute;
    top: 50%;
    right: 17px;
    width: 16px;
    height: 16px;

    transform: translateY(-50%);
`