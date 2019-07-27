import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'

import { 
    Wrapper,
    UserInfo,
    AvatarWrapper,
    Name,
    Bage,
    Panel,
    Options,
    ModeWrapper,
    Input,
    SwitcherWrapper,
    SwitcherBg,
    SwitcherButton
} from './Content.styled'

const useStyles = makeStyles({
    avatar: {
        width: 50,
        height: 50,
    },
    right: {
        position: 'absolute!important',
        right: 8,
        // display: 'block!important',
        top: '50%!important'
    }
})

const options = [
    {name: 'Предмети', url: '/'},
    {name: 'Кабінет', url: '/'},
    {name: 'Користувачі', url: '/'},
    {name: 'Налаштування', url: '/'},
]

const Content = (props) => {
    const classes = useStyles()
    const [optionId, setOptionId] = useState(0)
    const [switcherPose, setSwPose] = useState(false)

    return(
        <Wrapper>
            <UserInfo>
                <AvatarWrapper>
                    <Avatar src='./img/avatar.jpg' className={classes.avatar} />
                    <Bage pose={'online'} />
                </AvatarWrapper>
                <Name>Безруков Олександр</Name>
            </UserInfo>
            <Panel>
                {
                    options.map((option, index) => (
                        <NavLink
                            key={index}
                            to={option.url}
                        >
                            <Options
                                onClick={
                                    () => {
                                        setOptionId(index)
                                    }
                                }
                            >
                            {/* add NavLink */}
                                <img 
                                    src='./img/rose-arrow.png'
                                    style={{
                                        display: index === optionId ? 'inline-block' : 'none'
                                    }}
                                />
                                <p>{option.name}</p>
                                <img 
                                    src='./img/grey-arrow.png'
                                    className={classes.right}
                                    style={{
                                        display: index === optionId ? 'none' : 'inline-block'
                                    }}
                                />
                            </Options>
                            <hr />
                        </NavLink>
                    ))
                }

                <ModeWrapper>
                    <h1>Режим офлайну</h1>

                    <SwitcherWrapper>
                        <Input type='checkbox' id='mode'/>
                        <label
                            htmlFor='mode'
                            onClick={
                                () => {
                                    setSwPose(!switcherPose)
                                }
                            }
                        >
                            <SwitcherBg>
                                <SwitcherButton pose={switcherPose ? 'offline' : 'online'}/>
                            </SwitcherBg>
                        </label>
                    </SwitcherWrapper>
                </ModeWrapper>
            </Panel>
        </Wrapper>
    )
}

export default Content