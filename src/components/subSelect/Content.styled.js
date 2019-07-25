import posed from 'react-pose'
import styled from 'styled-components'

import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                width: 220,
                height: 47
            }
        },
        MuiFormHelperText: {
            root: {
                marginLeft: 0
            },
            contained: {
                marginLeft: 0
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