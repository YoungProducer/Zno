import React from 'react'
import PropTypes from 'prop-types'

import { 
    Wrapper,
    Square,
    Cross,
    Indices,
} from './OneRightAnswer.styled'

import {
    GlobalWrapper,
    RowIndices
} from './RelationsAnswer.styled'

import { horizontalNumeration } from './OneRightAnswer'

const verticalNumeration = [
    '1', '2', '3', '4'
]

class RelationsAnswers extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            selectedAnswer: [-1, -1, -1, -1]
        }
    }

    updateAnswers = () => {
        if (this.props.selectedAnswers[this.props.testId][0] !== -1 &&
            this.props.selectedAnswers[this.props.testId][1] !== -1 &&
            this.props.selectedAnswers[this.props.testId][2] !== -1 &&
            this.props.selectedAnswers[this.props.testId][3] !== -1
        ) {
            this.props.updateAnswer(true, 'selected')
        }
        if (this.props.givedAnswers[this.props.testId][0] !== -1 &&
            this.props.givedAnswers[this.props.testId][1] !== -1 &&
            this.props.givedAnswers[this.props.testId][2] !== -1 &&
            this.props.givedAnswers[this.props.testId][3] !== -1) 
        {
            this.props.updateAnswer(true, 'gived')
        }
    }

    componentDidUpdate() {
        this.updateAnswers()
    }

    render() {
        const { 
            onSaveSelectedRelationAnswer,
            testId,
            selectedAnswers,
            updateAnswer,
            givedAnswers
        } = this.props

        return(
            <GlobalWrapper>
                {
                    verticalNumeration.map((vert, vindex) => (
                        <Wrapper
                            key={vindex}
                            style={{
                                marginTop: 4
                            }}
                        >
                            <RowIndices>{vert}</RowIndices>
                            {
                                horizontalNumeration.map((hor, hindex) => (
                                    <Square
                                        key={hindex}
                                        onClick={
                                            () => {
                                                if (givedAnswers[testId][0] === -1 &&
                                                    givedAnswers[testId][1] === -1 &&
                                                    givedAnswers[testId][2] === -1 &&
                                                    givedAnswers[testId][3] === -1
                                                ) {
                                                    this.setState({selectedAnswer: hindex + 1}),
                                                    onSaveSelectedRelationAnswer(testId, vindex, hindex + 1)
                                                }
                                                if (selectedAnswers[testId][0] !== -1 &&
                                                    selectedAnswers[testId][1] !== -1 &&
                                                    selectedAnswers[testId][2] !== -1 &&
                                                    selectedAnswers[testId][3] !== -1
                                                ) {
                                                    updateAnswer(true, 'selected')
                                                }
                                            }
                                        }
                                    >
                                        {
                                            vindex === 0 ? (
                                                <Indices>{hor}</Indices>
                                            ) : (<></>)
                                        }
                                        <Cross 
                                            src='./img/grey-cross.png' 
                                            opacity={selectedAnswers[testId][vindex] === hindex + 1 ? 1 : 0}
                                        />
                                    </Square>
                                ))
                            }
                        </Wrapper>
                    ))
                }
            </GlobalWrapper>
        )
    }
}

RelationsAnswers.propTypes = {
    onSaveSelectedRelationAnswer: PropTypes.func.isRequired,
    selectedAnswers: PropTypes.array.isRequired,
    givedAnswers: PropTypes.array.isRequired
}

export default RelationsAnswers