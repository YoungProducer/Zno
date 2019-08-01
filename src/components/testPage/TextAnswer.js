import React from 'react'
import PropTypes from 'prop-types'

import {
    TextFieldsWrapper,
    TextField
} from './TextAnswer.styled'
import { value } from 'popmotion';

class TextAnswer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            answers: []
        }
    }

    initAnswersArray = (size) => {
        this.setState(state => {
            const temp = []
            for (let i = 0; i < size; i++) {
                temp.push('')
            }

            return {
                value: '',
                answers: temp
            }
        })

        window.setTimeout(() => {
            console.log(this.state.answers)
        }, 200)
    }

    componentDidMount() {
        this.initAnswersArray(this.props.selectedAnswers[this.props.testId].length)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.testId !== nextProps.testId) {
            this.initAnswersArray(nextProps.selectedAnswers[nextProps.testId].length)
        }
    }

    inputOnChange = (event, index) => {
        const value = event.target.value

        this.setState(state => {
            const list = state.answers.map((answer, aIndex) => {
                if (aIndex === index) {
                    return value;
                } else {
                    return answer;
                }
            })

            return {
                answers: list
            };
        })
    }

    render() {
        const {
            rightAnswer,
            testId,
            selectedAnswers
        } = this.props

        console.log(this.state.answers)

        return(
            <TextFieldsWrapper>
                {
                    rightAnswer.map((obj, index) => (
                        <TextField 
                            key={index}
                            onChange={
                                event => { 
                                    this.inputOnChange(event, index) 
                                }
                            }
                            value={this.state.answers[index]}
                        />
                    ))
                }
            </TextFieldsWrapper>
        )
    }
}

TextAnswer.propTypes = {
    onSaveSelectedTextAnswer: PropTypes.func.isRequired,
    selectedAnswers: PropTypes.array.isRequired,
    givedAnswers: PropTypes.array.isRequired
}

export default TextAnswer