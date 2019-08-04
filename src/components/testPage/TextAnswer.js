import React from 'react'
import PropTypes from 'prop-types'

import {
    TextFieldsWrapper,
    TextField,
    TextFieldWrapper
} from './TextAnswer.styled'

class TextAnswer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            answers: [],
            inited: false
        }
    }

    initAnswersArray = (props) => {
        this.setState({answers: props.selectedAnswers[props.testId]})
    }

    componentDidMount() {
        this.initAnswersArray(this.props)
        this.setState({inited: true})
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
        const { onSaveSelectedTextAnswer, updateAnswer } = this.props
        const value = event.target.value

        this.setState(state => {
            const list = state.answers.map((answer, aIndex) => {
                if (aIndex === index) {
                    return value;
                } else {
                    return answer;
                }
            })
            updateAnswer(true, 'selected')
            onSaveSelectedTextAnswer(testId, index, list[index])

            return {
                answers: list
            };
        })
    }

    renderRightAnswers = (index) => {
        if (this.state.inited) {
            if (this.props.showAnswersAfterTest) {
                return <></>;
            } else {
                return <p>{this.props.rightAnswer[index]}</p>
            }
        }
    }

    render() {
        const { 
            inited
        } = this.state

        const {
            rightAnswer,
            testId,
            selectedAnswers,
            givedAnswers,
            showAnswersAfterTest,
            isTestFinished
        } = this.props

        return(
            <TextFieldsWrapper>
                {
                    rightAnswer.map((obj, index) => (
                        <TextFieldWrapper
                            key={index}
                        >
                            {
                                inited ? showAnswersAfterTest ? (<></>) : 
                                isTestFinished ? (<p>{rightAnswer[index]}</p>) :
                                this.checkIsGived(givedAnswers, testId) ? 
                                (<p>{rightAnswer[index]}</p>) : 
                                (<></>) : (<></>)
                            }
                            <TextField 
                                onChange={
                                    event => {
                                        if (!isTestFinished) {
                                            if (!this.checkIsGived(givedAnswers, testId)) {
                                                this.inputOnChange(event, index, testId)
                                            } 
                                        }
                                    }
                                }
                                value={selectedAnswers[testId][index]}
                            />
                        </TextFieldWrapper>
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