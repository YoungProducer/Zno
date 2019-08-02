import React from 'react'
import PropTypes from 'prop-types'

import {
    TextFieldsWrapper,
    TextField
} from './TextAnswer.styled'

class TextAnswer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            answers: []
        }
    }

    initAnswersArray = (props) => {
        this.setState({answers: props.selectedAnswers[props.testId]})
    }

    componentDidMount() {
        this.initAnswersArray(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.testId !== nextProps.testId) {
            this.initAnswersArray(nextProps)
        }
    }

    checkIsSelected = (selectedAnswers, testId) => {
        let selected = false
        
        for (let i = 0; i < selectedAnswers[testId].length; i++) {
            if (selectedAnswers[testId][i] !== '') {
                selected = true
                break;
            }
        }

        return selected;
    }

    checkIsGived = (givedAnswers, testId) => {
        let gived = true
        for (let i = 0; i < givedAnswers[testId].length; i++) {
            if (givedAnswers[testId][i] === '') {
                gived = false
                break;
            }
        }

        return gived;
    }

    componentDidUpdate() {
        const { givedAnswers, selectedAnswers, testId } = this.props

        this.props.updateAnswer(this.checkIsSelected(selectedAnswers, testId), 'selected')
        this.props.updateAnswer(this.checkIsGived(givedAnswers, testId), 'gived')
    }

    inputOnChange = (event, index, testId) => {
        const { onSaveSelectedTextAnswer } = this.props
        const value = event.target.value

        this.setState(state => {
            const list = state.answers.map((answer, aIndex) => {
                if (aIndex === index) {
                    return value;
                } else {
                    return answer;
                }
            })
            this.props.updateAnswer(true, 'selected')
            onSaveSelectedTextAnswer(testId, index, list[index])

            return {
                answers: list
            };
        })
    }

    render() {
        const {
            rightAnswer,
            testId,
            selectedAnswers,
            givedAnswers,
            updateAnswer
        } = this.props

        return(
            <TextFieldsWrapper>
                {
                    rightAnswer.map((obj, index) => (
                        <TextField 
                            key={index}
                            onChange={
                                event => {
                                    if (!this.checkIsGived(givedAnswers, testId)) {
                                        this.inputOnChange(event, index, testId)
                                    } 
                                }
                            }
                            value={selectedAnswers[testId][index]}
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