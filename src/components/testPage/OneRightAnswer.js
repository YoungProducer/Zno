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
            selectedAnswer: -1
        }
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

    render() {
        const { 
            onSaveSelectedAnswer, 
            testId,
            selectedAnswers,
            updateAnswer,
            givedAnswers
        } = this.props

        console.log('updated')

        return(
            <Wrapper>
                {
                    horizontalNumeration.map((obj, index) => (
                        <Square
                            key={index}
                            onClick={
                                () => {
                                    if (givedAnswers[testId] === -1) {
                                        this.setState({selectedAnswer: index + 1}),
                                        onSaveSelectedAnswer(testId, index + 1)
                                        updateAnswer(true)
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
    selectedAnswers: PropTypes.array.isRequired,
    givedAnswers: PropTypes.array.isRequired
}

export default OneRightAnswer