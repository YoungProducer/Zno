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
        <NavLink
            to={'/selection/' + props.subName}
        >
            <Wrapper
                onMouseEnter={() => setPose('hover')}
                onMouseLeave={() => setPose('init')}
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
        </NavLink>
    )
}

export default Subject