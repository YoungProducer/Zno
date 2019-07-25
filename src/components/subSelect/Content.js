import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import {
    ContentWrapper,
} from '../subjects/Content.styled'

import {
    theme,
    Header,
    SubName
} from './Content.styled'

class Content extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            subjectName: '',
            years: [
                2019,
                2018,
                2017,
                2016
            ],
            selectedYear: 2019
        }
    }

    componentWillMount() {
        this.setState({
            subjectName: this.getSubName()
        })
    }

    getSubName = () => {
        let url = decodeURI(window.location.hash)

        url = url.split('').reverse().join('')
        url = url.slice(0, url.indexOf('/'))
        url = url.split('').reverse().join('')

        return url;
    }

    _inputHandle = (event) => {
        this.setState({
            selectedYear: event.target.value
        })
    }

    render() {
        const { 
            subjectName, 
            years, 
            selectedYear, 
            _inputHandle
        } = this.state

        return(
            <ContentWrapper>
                <Header>Вибір тесту</Header>
                <SubName>{subjectName}</SubName>

                <ThemeProvider
                    theme={theme}
                >
                    <TextField
                        id="standard-select-currency"
                        select
                        value={selectedYear}
                        onChange={_inputHandle}
                        helperText="Виберіть рік"
                        margin="none"
                        variant="outlined"
                    >
                        {years.map(year => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>
                </ThemeProvider>
            </ContentWrapper>
        )
    }
}

export default Content