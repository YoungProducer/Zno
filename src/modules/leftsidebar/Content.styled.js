import posed from 'react-pose'
import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 280px;
    height: 100vh;
    background-color: #eee;

    padding-bottom: 4px;
`

export const UserInfo = styled.div`
    height: 145px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const AvatarWrapper = styled.div`
    width: 50px;
    height: 50px;

    margin-right: 10px;
    position: relative;
`

export const Name = styled.h1`
    font-size: 18px;
    font-family: 'ProductSans';
    font-weight: lighter;
`

const PosedBage = posed.span({
    offline: {
        backgroundColor: '#E74C3C'
    },
    online: {
        backgroundColor: '#BADC58'
    }
})

export const Bage = styled(PosedBage)`
    height: 8px;
    width: 8px;
    position: absolute;
    left: 39px;
    top: 39px;

    border-radius: 50%;
`

export const Panel = styled.div`
    width: 272px;
    height: calc(100% - 149px);

    margin: 4px;

    padding: 6px;

    background-color: #fff;
    
    border-radius: 4px;

    hr {
        border: 1px solid #F7F5F2;
    }
`

const PosedOptions = posed.div({
    hoverable: true,
    init: {
        backgroundColor: '#fff'
    },
    hover: {
        backgroundColor: '#eee'
    }
})

export const Options = styled(PosedOptions)`
    height: 42px;
    width: 260px;
    
    position: relative;

    background-color: #fff;

    padding-left: 8px;
    padding-right: 8px;

    border-radius: 6px;

    cursor: pointer;

    p {
        font-family: 'ProductSans';
        font-weight: lighter;
        font-size: 14px;
        color: #414141;

        position: relative;
        top: 50%;
        
        transform: translateY(-50%);

        left: 8px;

        display: inline-block;
    }

    img {
        position: relative;
        top: 40%;
        width: 10px;
        height: 10px;

        display: inline-block;

        transform: translateY(-50%);
    }
`

export const ModeWrapper = styled.div`
    width: 260px;
    height: 20px;
    position: absolute;
    bottom: 4px;

    display: flex;
    justify-content: space-between;

    h1 {
        font-family: 'ProductSans';
        font-weight: lighter;
        font-size: 14px;
    }
`

export const Input = styled.input`
  display: none;
`

export const SwitcherWrapper = styled.div`
    ${'' /* height: 16px;
    width: 32px;
    border-radius: 4px;
    background-color: #E5E7E9; */}
    display: inline-block;
    
`

export const SwitcherBg = styled.div`
    height: 16px;
    width: 32px;
    border-radius: 4px;
    background-color: #E5E7E9;
    padding: 2px;
    cursor: pointer;
`

const PosedSwitcherButton = posed.div({
    offline: {
        background: '#FF6A5C',
        x: 0
    },
    online: {
        background: '#BADC58',
        x: 16
    }
})

export const SwitcherButton = styled(PosedSwitcherButton)`
    width: 12px;
    height: 12px;
    border-radius: 3px;
`