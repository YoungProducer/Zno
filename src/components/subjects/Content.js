import React from 'react'
import Subject from './Subject'

import { 
    ContentWrapper,
    SubjectsWrapper 
} from './Content.styled'

const Content = (props) => {

    return(
        <ContentWrapper>
            <SubjectsWrapper>
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Математика'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Фізика'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Хімія'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Англійська мова'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Українська мова та література'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'Географія'}
                />
            </SubjectsWrapper>
        </ContentWrapper>
    )
}

export default Content