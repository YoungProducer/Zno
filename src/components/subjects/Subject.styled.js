import posed from 'react-pose'
import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    width: calc((100% / 4) - 16px);
    height: 140px;

    background-color: #eeeeee;

    border-radius: 4px;

    overflow: hidden;

    display: inline-block;
    margin-right: 16px;
    margin-bottom: 13px;

    @media (max-width: 1000px) {
        width: calc((100% / 3) - 16px)
    }

    cursor: pointer;
`

const PosedWrapperBg = posed.div({
    init: {
        x: '-101%',
        transition: {
            ease: [0.17, 0.81, 0.32, 0.94],
            duration: 400
        }
    },
    hover: {
        x: '0%',
        transition: {
            ease: [0.17, 0.81, 0.32, 0.94],
            duration: 400
        }
    }
})

export const WrapperBg = styled(PosedWrapperBg)`
    background-image: linear-gradient(to right, ${props => props.lColor}, ${props => props.rColor});

    width: 100%;
    height: 140px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    
    z-index: 1;
`

export const Name = styled.h1`
    position: relative;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    font-family: 'ProductSans';
    font-weight: lighter;
    font-size: 18px;

    text-align: center;

    z-index: 2;

    transition: all .1s ease-in-out;
`