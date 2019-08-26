import React from 'react'
import PropTypes from 'prop-types'

import {
    Wrapper,
    Square,
    Indices,
    Cross
} from './OneRightAnswer.styled'

export const horizontalNumeration = [
    'А', 'Б', 'В', 'Г', 'Д'
]

class OneRightAnswer extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            selectedAnswer: -1,
            previousAnswer: -2,
            inited: false,
        }
    }

    componentDidMount() {
        this.setState({
            inited: true,
        })
    }

    componentDidUpdate() {
        if (this.props.selectedAnswers[this.props.testId] !== -1) {
            this.props.updateAnswer(true, 'selected')
        }
        else {
            this.props.updateAnswer(false, 'selected')
        }
        if (this.props.givedAnswers[this.props.testId] !== -1) {
            this.props.updateAnswer(true, 'gived')
        }
        else {
            this.props.updateAnswer(false, 'gived')
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    render() {
        const { 
            onSaveSelectedAnswer, 
            testId,
            selectedAnswers,
            updateAnswer,
            givedAnswers,
            showAnswersAfterTest,
            rightAnswer,
            isTestFinished,
            onNullifyAnswer,
            onNullifySelectedAnswer,
        } = this.props

        return(
            <Wrapper>
                {
                    horizontalNumeration.map((obj, index) => (
                        <Square
                            key={index}
                            onClick={
                                () => {
                                    if (!isTestFinished) {
                                        if (index + 1 !== selectedAnswers[testId]) {
                                            if (givedAnswers[testId] !== -1) {
                                                onNullifyAnswer(testId, 0)
                                                onNullifySelectedAnswer(testId, 0)
                                            }
                                        }
                                        this.setState({selectedAnswer: index + 1}),
                                        onSaveSelectedAnswer(testId, index + 1)
                                        updateAnswer(true, 'selected')
                                    }
                                }
                            }
                            bgColor={

                                () => {
                                    if (this.state.inited) {
                                        if (showAnswersAfterTest) {
                                            return '#eee';
                                        } else {
                                            if (isTestFinished) {
                                                if (index + 1 === rightAnswer) {
                                                    return '#BADC58';
                                                } else {
                                                    if (givedAnswers[testId] === index + 1) { 
                                                        return '#FF6A5C';
                                                    }
                                                    return '#eee';
                                                }
                                            } else {
                                                if (givedAnswers[testId] !== -1) {
                                                    if (index + 1 === rightAnswer) {
                                                        return '#BADC58';
                                                    } else {
                                                        if (givedAnswers[testId] === index + 1) { 
                                                            return '#FF6A5C';
                                                        } 
                                                        return '#eee';
                                                    }
                                                } else {
                                                    return '#eee';
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        >
                            <Indices>{obj}</Indices>
                            <Cross 
                                src='./img/grey-cross.png' 
                                opacity={selectedAnswers[testId] === index + 1 ? 1 : 0}
                            />
                        </Square>
                    ))
                }          
            </Wrapper>
        )
    }
}

OneRightAnswer.propTypes = {
    onSaveSelectedAnswer: PropTypes.func.isRequired,
    onGiveAnAnswer: PropTypes.func.isRequired,
    onNullifyAnswer: PropTypes.func.isRequired,
    onNullifySelectedAnswer: PropTypes.func.isRequired,
    selectedAnswers: PropTypes.array.isRequired,
    givedAnswers: PropTypes.array.isRequired
}

export default OneRightAnswer