import posed from 'react-pose'
import styled from 'styled-components'

export const Header = styled.div`
    width: 100%;
    height: 70px;
`

export const NameWrapper = styled.div`
    float: left;
`

export const CountDownWrapper = styled.div`
    float: right;
    text-align: right;

    ${'' /* button {
        color: #E57373;
        background-color: #fff;

        &:hover {
            color: #E54F4F;
            background-color: #fff;
        }
    } */}
`

export const SubName = styled.p`
    font-family: 'ProductSans';
    font-size: 18px;
    font-weight: lighter;

    color: #333;
    
    margin-bottom: 5px;
`

export const Counter = styled.p`
    font-family: 'ProductSans';
    font-size: 14px;
    font-weight: lighter;

    color: #6f6f6f;

    margin-bottom: 20px;
`

export const TestNumberSelWrapper = styled.div`
    width: 100%;
    height: auto;
`

export const Option = styled.p`
    font-family: 'ProductSans';
    font-size: 16px;
    font-weight: lighter;

    color: ${props => props.tcolor || '#343434'};
    background-color: ${props => props.bgColor || '#eeeeee'};

    border-radius: 4px;

    width: 40px;
    height: 40px;

    display: inline-block;

    margin-right: 6px;
    margin-bottom: 6px;
    padding: 10px;

    text-align: center;
    
    cursor: pointer;

    transition: all .2s ease-in-out;

    &:hover {
        color: #fff;
        background-color: ${props => props.hbgColor || '#FF6A5C'};

        transition: all .2s ease-in-out;
    }

`

export const Image = styled.img`
    width: 100%;
    height: 100%;

    border: 2px solid #F7F5F2;
    border-radius: 4px;
`

export const ButtonsWrapper = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;

    margin-top: 70px;
`

export const Button = styled.button`
    height: 40px;
    width: 150px;

    border-radius: 4px;

    background-color: ${props => props.primary ? '#4CAF50' : '#F44336'};
    ${'' /* background-color: #fff; */}
    ${'' /* color: ${props => props.primary ? '#FFD54F' : '#333'}; */}
    color: #fff;

    font-family: 'ProductSans';
    font-size: 16px;
    font-weight: lighter;
    text-align: center;

    ${'' /* padding: 11px 0 11px 0; */}
    ${'' /* text-align: ${props => props.primary ? 'left' : 'right'}; */}

    cursor: pointer;

    border: none;
    outline: none;

    transition: color .2s ease-in-out;

    &:hover {
        ${'' /* background-color: ${props => props.primary ? '#449D48' : '#D23B30'}; */}
        ${'' /* color: ${props => props.primary ? '#FFC107' : '#222'}; */}
        color: #fff;
        transition: color .2s ease-in-out;
    }
`

export const ShowAnswersSwitcher = styled.input`
    
`

export const ModeWrapper = styled.div`
    width: 260px;
    height: 20px;

    display: flex;
    justify-content: flex-end;

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