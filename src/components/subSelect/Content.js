import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import Selection from './Selection'

import { ContentWrapper } from '../subjects/Content.styled'

import {
  theme,
  Header,
  PopUpWrapper,
  Eclispe,
  ButtonsWrapper,
  ListWrapper,
  ModeWrapper,
  Input,
  SwitcherWrapper,
  SwitcherBg,
  SwitcherButton
} from './Content.styled'

class PopUpWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inited: false,
      subjectName: '',
      years: [2019, 2018, 2017, 2016],
      parts: [],
      selectedYear: 2019,
      selectedType: '',
      selectedPart: '',
      selectedTheme: '',
      currentThemes: [],
      showThemes: false,
      showDeepRadioButtons: false,
      selectedDeepType: '',
      showDeepList: false,
      selectedDeepListItem: '',
      showAnswersAfterTest: true
    }
  }

  componentWillMount() {
    this.setState({
      subjectName: this.getSubName(),

    })
  }

  componentDidMount() {
    // console.log(this.props.subject)
    this.setState({
      inited: true,
      selectedPart: this.props.subSubjects[0],
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props);
    if (this.props.active) {
      const link = '../../../dist/tasks/' + this.props.subject[0] + this.props.subject.slice(1, this.props.subject.length).toLowerCase() + '/parts.json'
      console.log(link)
      console.log('../../../dist/tasks/' + this.props.subject[0] + this.props.subject.slice(1, this.props.subject.length).toLowerCase() + '/parts.json')
      // console.log(require(link))
      console.log(require('../../../dist/tasks/' + this.props.subject[0] + this.props.subject.slice(1, this.props.subject.length).toLowerCase() + '/parts.json'))
      console.log(require('../../../dist/tasks/Математика/parts.json'))
    }
    // console.log(this.props.subject)
    // const link = '../../../dist/tasks/' + this.props.subject + '/parts.json'
    // console.log(link)
    // console.log(require(link))
    // if (prevProps.active === false) {
    //   this.setState({
    //     selectedType: '',
    //     selectedPart: '',
    //     selectedTheme: '',
    //     showThemes: false,
    //     showDeepRadioButtons: false,
    //     selectedDeepType: ''
    //     showDeepList: false,
    //     selectedDeepListItem: '',
    //     // parts: require('../../../dist/tasks/' + this.props.subject + '/parts.json')
    //   })
    // }

    console.log(prevProps)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.active)
    if (nextProps.active === true) {
      this.setState({
        selectedType: '',
        selectedPart: '',
        selectedTheme: '',
        showThemes: false,
        showDeepRadioButtons: false,
        selectedDeepType: '',
        showDeepList: false,
        selectedDeepListItem: '',
        // parts: require('../../../dist/tasks/' + this.props.subject + '/parts.json')
      })
      // console.log(require('../../../dist/tasks/' + this.props.subject + '/parts.json'))
    }
  }

  updateThemes = partName => {
    const { themes } = this.props

    this.setState({
      currentThemes: themes[partName] === undefined ? [] : themes[partName],
      selectedTheme: themes[partName] === undefined ? '' : themes[partName][0]
    })

    window.setTimeout(() => {
      if (this.state.selectedType === 'ВИБІР ТЕМИ') {
        if (this.state.currentThemes.length !== 0) {
          this.setState({ showThemes: true })
        } else this.setState({ showThemes: false })
      } else this.setState({ showThemes: false })
    }, 10)
  }

  getSubName = () => {
    let url = decodeURI(window.location.hash)

    url = url
      .split('')
      .reverse()
      .join('')
    url = url.slice(0, url.indexOf('/'))
    url = url
      .split('')
      .reverse()
      .join('')

    return url
  }

  _inputYearHandle = event => {
    this.setState({
      selectedYear: event.target.value
    })
  }

  _inputPartHandle = event => {
    this.setState({
      selectedPart: event.target.value
    })

    this.updateThemes(event.target.value)
  }

  _inputThemeHandle = event => {
    this.setState({
      selectedTheme: event.target.value
    })
  }

  _radioHandle = event => {
    this.setState({
      selectedType: event.target.value
    })

    if (event.target.value === 'ВИБІР ТЕМИ') {
      this.updateThemes(this.state.selectedPart)
      this.setState({ showDeepRadioButtons: false, showDeepList: false })
    }

    if (event.target.value === 'ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО') {
      this.setState({
        showDeepRadioButtons: true,
        showThemes: false,
        showDeepList: false,
        selectedDeepListItem:
          this.state.selectedDeepType !== 'ТРЕНУВАЛЬНІ ВАРІАНТИ'
            ? this.props.testingCases[0]
            : this.props.mainSession[0]
      })
    }
  }

  _deepRadioHandle = event => {
    if (event.target.value === 'ОСНОВНА СЕССІЯ ЗНО') {
      this.setState({
        selectedDeepListItem: this.props.mainSession[0]
      })
    }
    if (event.target.value === 'ТРЕНУВАЛЬНІ ВАРІАНТИ') {
      this.setState({
        selectedDeepListItem: this.props.testingCases[0]
      })
    }
    this.setState({
      selectedDeepType: event.target.value,
      showDeepList: true
      //   selectedDeepListItem:
      //     this.state.selectedDeepType !== 'ТРЕНУВАЛЬНІ ВАРІАНТИ'
      //       ? this.props.testingCases[0]
      //       : this.props.mainSession[0]
    })
  }

  _deepListInputHandle = event => {
    this.setState({
      selectedDeepListItem: event.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subSubjects !== undefined) {
      this.setState({
        selectedPart: nextProps.subSubjects[0]
      })
    }
  }

  render() {
    const {
      selectedPart,
      selectedType,
      selectedTheme,
      currentThemes,
      showThemes,
      showDeepRadioButtons,
      selectedDeepType,
      showDeepList,
      selectedDeepListItem,
      showAnswersAfterTest
    } = this.state

    const {
      active,
      changePopUpState,
      subSubjects,
      mainSession,
      testingCases,
      onSetAnswersDisplay,
      isDisplayable,
      onLimitTime,
      isTimeLimited,
      onSetUpTasks,
      subject
    } = this.props

    const deepList =
      selectedDeepType === 'ТРЕНУВАЛЬНІ ВАРІАНТИ' ? testingCases : mainSession
    const showSwithcers =
      selectedDeepType === 'ОСНОВНА СЕССІЯ ЗНО' ? true : false

    return (
      <Eclispe pose={active ? 'visible' : 'hidden'}>
        <PopUpWrapper>
          <Header>Вибір тесту</Header>

          <ThemeProvider theme={theme}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Оберіть тип тесту</FormLabel>
              <RadioGroup
                aria-label='position'
                name='position'
                value={selectedType}
                onChange={this._radioHandle}
              >
                <FormControlLabel
                  value='ВИБІР ТЕМИ'
                  control={<Radio color='primary' />}
                  label='ВИБІР ТЕМИ'
                  labelPlacement='end'
                />
                <FormControlLabel
                  value='ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО'
                  control={<Radio color='primary' />}
                  label='ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО'
                  labelPlacement='end'
                />
              </RadioGroup>
            </FormControl>

            {subSubjects.length !== 0 && selectedType === 'ВИБІР ТЕМИ' ? (
              <FormControl component='div'>
                <FormLabel component='legend'>Оберіть частину</FormLabel>
                <TextField
                  id='standard-select-currency'
                  select
                  value={selectedPart}
                  onChange={this._inputPartHandle}
                  margin='none'
                  variant='outlined'
                >
                  {this.state.parts.map(subSubject => (
                    <MenuItem key={subSubject} value={subSubject}>
                      {subSubject}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showThemes ? (
              <FormControl component='div'>
                <FormLabel component='legend'>Оберіть тему</FormLabel>
                <TextField
                  id='standard-select-currency'
                  select
                  value={selectedTheme}
                  onChange={this._inputThemeHandle}
                  margin='none'
                  variant='outlined'
                >
                  {currentThemes.map(theme => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showDeepRadioButtons ? (
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Оберіть тип тесту</FormLabel>
                <RadioGroup
                  aria-label='position'
                  name='position'
                  value={selectedDeepType}
                  onChange={this._deepRadioHandle}
                >
                  <FormControlLabel
                    value='ТРЕНУВАЛЬНІ ВАРІАНТИ'
                    control={<Radio color='primary' />}
                    label='ТРЕНУВАЛЬНІ ВАРІАНТИ'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value='ОСНОВНА СЕССІЯ ЗНО'
                    control={<Radio color='primary' />}
                    label='ОСНОВНА СЕССІЯ ЗНО'
                    labelPlacement='end'
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <></>
            )}

            {showDeepList ? (
              <FormControl component='div'>
                <FormLabel component='legend'>
                  {selectedDeepType === 'ТРЕНУВАЛЬНІ ВАРІАНТИ'
                    ? 'Виберіть тренувальний варіант'
                    : 'Виберіть варіант ЗНО'}
                </FormLabel>
                <TextField
                  id='standard-select-currency'
                  select
                  value={selectedDeepListItem}
                  onChange={this._deepListInputHandle}
                  margin='none'
                  variant='outlined'
                >
                  {deepList.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showSwithcers ? (
              <>
                <ModeWrapper>
                  <SwitcherWrapper>
                    <Input type='checkbox' id='mode' />
                    <label
                      htmlFor='mode'
                      onClick={() => {
                        onSetAnswersDisplay(!isDisplayable)
                      }}
                    >
                      <SwitcherBg>
                        <SwitcherButton
                          pose={isDisplayable ? 'offline' : 'online'}
                        />
                      </SwitcherBg>
                    </label>
                  </SwitcherWrapper>
                  <h1>Показувати відповіді під час тесту</h1>
                </ModeWrapper>

                <ModeWrapper>
                  <SwitcherWrapper>
                    <Input type='checkbox' id='mode' />
                    <label
                      htmlFor='mode'
                      onClick={() => {
                        onLimitTime(!isTimeLimited)
                      }}
                    >
                      <SwitcherBg>
                        <SwitcherButton
                          pose={!isTimeLimited ? 'offline' : 'online'}
                        />
                      </SwitcherBg>
                    </label>
                  </SwitcherWrapper>
                  <h1>Обмежений час</h1>
                </ModeWrapper>
              </>
            ) : (
              <></>
            )}
          </ThemeProvider>

          <ButtonsWrapper>
            <NavLink to={'/test'}>
              <h1 style={{ float: 'left' }}>Розпочати тест</h1>
            </NavLink>
            <h1
              style={{ float: 'right' }}
              onClick={() => {
                changePopUpState(false)
                onSetUpTasks(subject, selectedPart, selectedDeepType, selectedTheme, selectedDeepListItem)
              }}
            >
              Скасувати
            </h1>
          </ButtonsWrapper>
        </PopUpWrapper>
      </Eclispe>
    )
  }
}

PopUpWindow.propTypes = {
  onSetAnswersDisplay: PropTypes.func.isRequired,
  isDisplayable: PropTypes.bool.isRequired,
  onLimitTime: PropTypes.func.isRequired,
  isTimeLimited: PropTypes.bool.isRequired,
  onSetUpTasks: PropTypes.func.isRequired
}

export default PopUpWindow
