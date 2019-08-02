import React from 'react'
import PropTypes from 'prop-types'

import OneRightAnswer from '../../containers/OneRightAnswer'
import RelationAnswers from '../../containers/RelationsAnswer'
import TextAnswer from '../../containers/TextAnswer'

import { ContentWrapper } from '../subjects/Content.styled'

import { 
    SubName, 
    Counter,
    TestNumberSelWrapper,
    Option,
    Image,
    ButtonsWrapper,
    Button
} from './Content.styled'

const tasks = [
    { img: '/a.png', type: 0, answer: 1},
    { img: '/b.png', type: 0, answer: 2},
    { img: '/c.png', type: 0, answer: 2},
    { img: '/d.png', type: 0, answer: 2},
    { img: '/e.png', type: 0, answer: 2},
    { img: '/j.png', type: 1, answer: [1, 4, 2, 3]},
    { img: '/f.png', type: 1, answer: [2, 1, 3, 4]},
    { img: '/g.png', type: 1, answer: [2, 3, 4, 1]},
    { img: '/h.png', type: 1, answer: [2, 1, 4, 3]},
    { img: '/h.png', type: 2, answer: ['some text']},
    { img: '/h.png', type: 2, answer: ['some text', 'some text']},
    { img: '/h.png', type: 2, answer: ['some text', 'some text', 'something']},
]


class Content extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            subject: '',
            year: 0,
            type: '',
            selectedTest: 1,
            tasks: tasks,
            isAnswerSelected: false,
            isAnswerGived: false,
            inited: false,
            updateComponents: 0
        }
    }

    componentWillMount() {
        this.props.onPushQuestions(this.state.tasks)
    }

    componentDidMount() {
        this.getInfo(decodeURI(window.location.hash))
        this.props.onInitAnswers(this.state.tasks)
        this.props.onInitSelectedAnswers(this.state.tasks)
        this.setState({inited: true})
    }

    getInfo = (url) => {
        let temp = url

        const type = this.getLastParam(temp)
        temp = this.cutToSlash(temp)
        const year = this.getLastParam(temp)
        temp = this.cutToSlash(temp)
        const subject = this.getLastParam(temp)

        this.setState({
            subject: subject,
            year: year,
            type: type
        })
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

    cutToSlash = (url) => {
        let temp = url

        temp = temp.split('').reverse().join('')
        temp = temp.slice(temp.indexOf('/') + 1, temp.length)
        temp = temp.split('').reverse().join('')
        return temp
    }

    getLastParam = (url) => {
        let temp = url

        temp = temp.split('').reverse().join('')
        temp = temp.slice(0, temp.indexOf('/'))
        temp = temp.split('').reverse().join('')

        return temp;
    }

    updateAnswer = (isAnswer, type) => {
        if (type === 'gived') {
            this.setState({
                isAnswerGived: isAnswer
            })
        }

        if (type === 'selected') {
            this.setState({
                isAnswerSelected: isAnswer,
            })
        }
    }

    nextQuestion = (currentQuestion) => {
        const {
            givedAnswers
        } = this.props

        let nQuestion = -1

        for (let i = currentQuestion; i < givedAnswers.length; i++) {
            if (this.state.tasks[i].type === 0) {
                if (givedAnswers[i] === -1) {
                    nQuestion = i + 1
                    break;
                }
            }
            if (this.state.tasks[i].type === 1) {
                if (givedAnswers[i][0] === -1 &&
                    givedAnswers[i][1] === -1 &&
                    givedAnswers[i][2] === -1 &&
                    givedAnswers[i][3] === -1
                ) {
                    nQuestion = i + 1
                    break;
                }
            }
            if (this.state.tasks[i].type === 2) {
                let selected = false

                for (let j = 0; j < givedAnswers[i].length; j++) {
                    if (givedAnswers[i][j] === '') {
                        selected = true
                        break;
                    }
                }

                nQuestion = selected ? i + 1 : -1
                break;
            }
        }

        if (nQuestion === -1) {
            nQuestion = givedAnswers.indexOf(-1) + 1
        }

        this.setState({selectedTest: nQuestion})
    }

    render() {
        const { 
            subject, 
            tasks, 
            selectedTest, 
            isAnswerSelected, 
            isAnswerGived 
        } = this.state

        const { 
            onNullifyAnswer,
            onNullifySelectedAnswer, 
            onGiveAnAnswer, 
            isSelected, 
            selectedAnswers,
            givedAnswers
        } = this.props

        return(
            <ContentWrapper>
                <SubName>
                    {subject}
                </SubName>
                <Counter>
                    Тест {selectedTest} з {tasks.length}
                </Counter>
                <TestNumberSelWrapper>
                    {
                        tasks.map((task, index) => (
                            <span key={index}>
                            {
                                task.type === 0 ? (
                                    <Option
                                        key={index + 1}
                                        bgColor={givedAnswers[index] !== -1 ? '#BADC58' : selectedAnswers[index] !== -1 ? '#FFC400' : index + 1 !== selectedTest ? '#eee' : '#FF6A5C'}
                                        tcolor={givedAnswers[index] !== -1 ? '#fff' : selectedAnswers[index] !== -1 ? '#fff' : index + 1 !== selectedTest ? '#343434' : '#fff'}
                                        hbgColor={givedAnswers[index] !== -1 ? '#AFCF52' : selectedAnswers[index] !== -1 ? '#FFAA00' : index + 1 !== selectedTest ? '#FF6A5C' : '#FF6A5C'}
                                        onClick={() => 
                                            {
                                                this.setState({selectedTest: index + 1})
                                                this.updateAnswer(false, 'selected')
                                                this.updateAnswer(false, 'gived')
                                            }
                                        }
                                    >
                                        {index + 1}
                                    </Option>
                                ) : 
                                task.type === 1 ? (
                                    <Option
                                        key={index + 1}
                                        bgColor={
                                            () => {
                                                if (this.state.inited) {
                                                    return givedAnswers[index][0] !== -1 && 
                                                    givedAnswers[index][1] !== -1 && 
                                                    givedAnswers[index][2] !== -1 && 
                                                    givedAnswers[index][3] !== -1 ? '#BADC58' :
                                                    selectedAnswers[index][0] !== -1 || 
                                                    selectedAnswers[index][1] !== -1 || 
                                                    selectedAnswers[index][2] !== -1 || 
                                                    selectedAnswers[index][3] !== -1 ? 
                                                    '#FFC400' :
                                                    index + 1 !== selectedTest ? '#eee' : 
                                                    '#FF6A5C';
                                                }
                                                else return '#eee';
                                            }
                                        }
                                        tcolor={
                                            () => {
                                                if (this.state.inited) {
                                                    return givedAnswers[index][0] !== -1 && 
                                                    givedAnswers[index][1] !== -1 && 
                                                    givedAnswers[index][2] !== -1 && 
                                                    givedAnswers[index][3] !== -1 ? '#fff' :
                                                    selectedAnswers[index][0] !== -1 || 
                                                    selectedAnswers[index][1] !== -1 || 
                                                    selectedAnswers[index][2] !== -1 || 
                                                    selectedAnswers[index][3] !== -1 ? 
                                                    '#fff' :
                                                    index + 1 !== selectedTest ? '#343434' : 
                                                    '#fff';
                                                }
                                                else return '#eee';
                                            }
                                        }
                                        hbgColor={
                                            () => {
                                                if (this.state.inited) {
                                                    return givedAnswers[index][0] !== -1 && 
                                                    givedAnswers[index][1] !== -1 && 
                                                    givedAnswers[index][2] !== -1 && 
                                                    givedAnswers[index][3] !== -1 ? '#AFCF52' :
                                                    selectedAnswers[index][0] !== -1 || 
                                                    selectedAnswers[index][1] !== -1 || 
                                                    selectedAnswers[index][2] !== -1 || 
                                                    selectedAnswers[index][3] !== -1 ? 
                                                    '#FFAA00' :
                                                    index + 1 !== selectedTest ? '#FF6A5C' : 
                                                    '#FF6A5C';
                                                }
                                                else return '#eee';
                                            }
                                        }
                                        onClick={() => 
                                            {
                                                this.setState({selectedTest: index + 1})
                                                this.updateAnswer(false, 'selected')
                                                this.updateAnswer(false, 'gived')
                                            }
                                        }
                                    >
                                        {index + 1}
                                    </Option>
                                ) : (
                                    <Option
                                        key={index + 1}
                                        onClick={() => 
                                            {
                                                this.setState({selectedTest: index + 1})
                                                this.updateAnswer(false, 'selected')
                                                this.updateAnswer(false, 'gived')
                                            }
                                        }
                                        bgColor={
                                            () => {
                                                if (this.state.inited) {
                                                    if (this.checkIsGived(givedAnswers, index)) {
                                                        return '#BADC58';
                                                    }
                                                    else if (this.checkIsSelected(selectedAnswers, index)) {
                                                        return '#FFC400'
                                                    } else if (index + 1 === selectedTest) {
                                                        return '#FF6A5C';
                                                    } else {
                                                        return '#eee'
                                                    }
                                                }
                                            }
                                        }
                                        tcolor={
                                            () => {
                                                if (this.state.inited) {
                                                    if (this.checkIsGived(givedAnswers, index)) {
                                                        return '#fff';
                                                    }
                                                    else if (this.checkIsSelected(selectedAnswers, index)) {
                                                        return '#fff'
                                                    } else if (index + 1 === selectedTest) {
                                                        return '#fff';
                                                    } else {
                                                        return '#343434'
                                                    }
                                                }
                                            }
                                        }
                                        hbgColor={
                                            () => {
                                                if (this.state.inited) {
                                                    if (this.checkIsGived(givedAnswers, index)) {
                                                        return '#AFCF52';
                                                    }
                                                    else if (this.checkIsSelected(selectedAnswers, index)) {
                                                        return '#FFAA00'
                                                    } else if (index + 1 === selectedTest) {
                                                        return '#FF6A5C';
                                                    } else {
                                                        return '#FF6A5C'
                                                    }
                                                }
                                            }
                                        }
                                    >
                                        {index + 1}
                                    </Option>
                                )
                            }
                            </span>
                        ))
                    }
                </TestNumberSelWrapper>
                <Image src={tasks[selectedTest - 1].img}/>
                {
                    tasks[selectedTest - 1].type === 0 ? (
                        <OneRightAnswer 
                            rightAnswer={tasks[selectedTest - 1].answer}
                            testId={selectedTest - 1}
                            updateAnswer={this.updateAnswer}
                            updateComponent={this.state.updateComponents}
                        />
                    ) : tasks[selectedTest - 1].type === 1 ? (
                        <RelationAnswers 
                            rightAnswer={tasks[selectedTest - 1].answer}
                            testId={selectedTest - 1}
                            updateAnswer={this.updateAnswer}
                            updateComponent={this.state.updateComponents}
                        /> 
                    ) : (
                        <TextAnswer 
                            rightAnswer={tasks[selectedTest - 1].answer}
                            testId={selectedTest - 1}
                            updateAnswer={this.updateAnswer}
                            updateComponent={this.state.updateComponents}
                        />
                    )
                }
                <ButtonsWrapper>
                    <Button 
                        primary
                        onClick={
                            () => {
                                if (isAnswerSelected) {
                                    onGiveAnAnswer(selectedTest - 1, selectedAnswers[selectedTest - 1])

                                    this.nextQuestion(selectedTest)
                                    this.updateAnswer(false, 'gived')
                                    this.updateAnswer(false, 'selected')
                                }

                                if (!isAnswerSelected && !isAnswerGived) {
                                    this.nextQuestion(selectedTest)
                                }
                            }
                        }
                    >
                        {isAnswerSelected ? 'Відповісти' : 'Пропустити'}
                    </Button>

                    <Button
                        primary
                        onClick={
                            () => {
                                if (isAnswerGived) {
                                    if (tasks[selectedTest - 1].type === 0) {
                                        onNullifyAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                        onNullifySelectedAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                    }
                                    if (tasks[selectedTest - 1].type === 1) {
                                        onNullifyAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                        onNullifySelectedAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                    }
                                    if (tasks[selectedTest - 1].type === 2) {
                                        onNullifyAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                        onNullifySelectedAnswer(selectedTest - 1, tasks[selectedTest - 1].type)
                                    }
                                    this.setState({updateComponents: Math.random()})
                                }
                            }
                        }
                    >
                        Змінити відповідь
                    </Button>
                    <Button>Завершити</Button>
                </ButtonsWrapper>
            </ContentWrapper>
        )
    }
}

Content.propTypes = {
    onPushQuestions: PropTypes.func.isRequired,
    onInitSelectedAnswers: PropTypes.func.isRequired,
    onInitAnswers: PropTypes.func.isRequired,
    onNullifyAnswer: PropTypes.func.isRequired,
    onNullifySelectedAnswer: PropTypes.func.isRequired,
    onGiveAnAnswer: PropTypes.func.isRequired,
    onGiveAnRelationAnswer: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    selectedAnswers: PropTypes.array.isRequired,
    givedAnswers: PropTypes.array.isRequired
}


export default Content