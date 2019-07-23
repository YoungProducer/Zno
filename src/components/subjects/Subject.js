import React, { useState } from 'react'

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
        >
            <WrapperBg 
                pose={pose} 
                lColor={props.leftColor}
                rColor={props.rightColor}
            />
            <Name>{props.subName}</Name>
        </Wrapper>
    )
}

export default Subject