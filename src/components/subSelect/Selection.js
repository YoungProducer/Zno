import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
    Wrapper,
    WrapperBg,
    Name
} from './Selection.styled'

const Selection = (props) => {
    const [pose, setPose] = useState('init')

    return(
        <NavLink
            to={'/test/' + props.subName + '/' + props.year + '/' + props.selName}
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
                    {props.selName}
                </Name>
            </Wrapper>
        </NavLink>
    )
}

export default Selection