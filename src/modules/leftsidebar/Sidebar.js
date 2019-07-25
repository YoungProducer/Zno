
import React, { useState } from 'react'

import {
    Wrapper,
    ArrowContainer,
    Arrow
} from './Sidebar.styled'

const Sidebar = (props) => {
    const [pose, setPose] = useState('init')

    return(
        <Wrapper
            pose={pose}
        >
            <ArrowContainer
                onClick={
                    () => setPose(pose === 'init' ? 'active' : 'init')
                }
            >
                <Arrow 
                    src='./img/arrow-icon.png' 
                />
            </ArrowContainer>
        </Wrapper>
    )
}

export default Sidebar