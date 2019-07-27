import posed from 'react-pose'
import styled from 'styled-components'

import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                width: 220,
                height: 47,
                '&$focused $notchedOutline': {
                    borderColor: '#565656',
                    borderWidth: 2,
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#565656',
                },
            },
            notchedOutline: {
                borderColor: "#E7E5E2",
                borderWidth: 2
            }
        },
        MuiFormHelperText: {
            root: {
                marginLeft: 0,
                fontFamily: 'ProductSans',
                fontWeight: 'lighter',
                fontSize: '14px',
                color: '#6F6F6F'
            },
            contained: {
                marginLeft: 0
            },
            
        },
        MuiSelect: {
            root: {
                fontFamily: 'ProductSans',
                fontWeight: 'lighter',
                fontSize: '18px',
                color: '#565656'
            },
            select: {
                backgroundColor: '',
                "&:focus": {
                    backgroundColor: '#fff'
                }
            }
        },
        MuiMenuItem: {
            root: {
                fontFamily: 'ProductSans',
                fontWeight: 'lighter',
                fontSize: '18px',
                color: '#565656'
            }
        }
    }
})

export const Header = styled.h1`
    font-family: 'ProductSans';
    font-weight: lighter;
    font-size: 36px;
    color: '#333';

    margin-bottom: 10px;
`

export const SubName = styled.p`
    font-family: 'ProductSans';
    font-size: 18px;
    font-weight: lighter;

    color: #6F6F6F;

    margin-bottom: 50px;
`

export const SelectionsWrapper = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 50px;
`