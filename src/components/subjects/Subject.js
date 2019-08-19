import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
    Wrapper,
    WrapperBg,
    Name
} from './Subject.styled'

const Subject = (props) => {
    const [pose, setPose] = useState('init')

    return(
        <Wrapper
            onMouseEnter={() => setPose('hover')}
            onMouseLeave={() => setPose('init')}
            onClick={() => { props.changePopUpState(true), props.changeSubject(props.subName, props.index)}}
        >
            <WrapperBg 
                pose={pose} 
                lColor={props.leftColor}
                rColor={props.rightColor}
            />
            <Name
                style={{
                    color: pose === 'init' ? '#333' : '#fff'
                }}
            >
                {props.subName}
            </Name>
        </Wrapper>
    )
}

export default Subject