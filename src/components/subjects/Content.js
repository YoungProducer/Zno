import React from 'react'
import Subject from './Subject'

import { 
    ContentWrapper,
    SubjectsWrapper,
    Header
} from './Content.styled'

const Content = (props) => {

    return(
        <ContentWrapper>
            <Header>Предмети</Header>

            <SubjectsWrapper>
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'МАТЕМАТИКА'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'ФІЗИКА'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'ФІЗИКА'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'АНГЛІЙСЬКА МОВА'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'УКРАЇНСЬКА МОВА ТА ЛІТЕРАТУРА'}
                />
                <Subject 
                    leftColor={'#FFBE76'}
                    rightColor={'#F0932B'}
                    subName={'ГЕОГРАФІЯ'}
                />
            </SubjectsWrapper>
        </ContentWrapper>
    )
}

export default Content