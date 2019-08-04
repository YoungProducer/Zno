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

    background-color: ${props => props.primary ? '#BADC58' : '#FF7979'};

    font-family: 'ProductSans';
    font-size: 16px;
    font-weight: lighter;
    text-align: center;
    color: #fff;

    padding: 11px 0 11px 0;

    cursor: pointer;

    border: none;
    outline: none;

    transition: background-color .2s ease-in-out;

    &:hover {
        background-color: ${props => props.primary ? '#AFCF52' : '#E74C3C'};
        transition: background-color .2s ease-in-out;
    }
`

export const ShowAnswersSwitcher = styled.input`
    
`