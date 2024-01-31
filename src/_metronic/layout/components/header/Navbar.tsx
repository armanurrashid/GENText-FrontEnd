import clsx from 'clsx'
import {ThemeModeSwitcher} from '../../../partials'
import {useAuth} from '../../../../app/modules/auth'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt, faMicrophone} from '@fortawesome/free-solid-svg-icons'
import {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {voicecommandActions} from '../../../../app/pages/store/voice-command'

const itemClass = 'ms-1 ms-md-4'
let lowerCaseSpokenText
const Navbar = () => {
  var routes = {
    dashboard: '/dashboard',
    upload: '/upload',
    history: '/history',
    profile: '/profile',
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {logout} = useAuth()
  const [isMicrophoneClicked, setMicrophoneClicked] = useState(false)
  const voiceRef = useRef<SpeechRecognition | null>(null)

  const handleMicrophoneClick = () => {
    setMicrophoneClicked((prev) => !prev)
    if (!isMicrophoneClicked) {
      voiceRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      if (voiceRef.current) {
        voiceRef.current.lang = 'en-BD'
        voiceRef.current.interimResults = false
        voiceRef.current.continuous = true
        voiceRef.current.onresult = function (event) {
          const spokenText = event.results[event.results.length - 1][0].transcript
          lowerCaseSpokenText = spokenText.toLowerCase()
          console.log(spokenText)
          dispatch(voicecommandActions.addSpokenWord(lowerCaseSpokenText))
          if (routes.hasOwnProperty(lowerCaseSpokenText)) {
            navigate(routes[lowerCaseSpokenText])
          }
          // if (lowerCaseSpokenText.includes('profile')) {
          //   navigate('/profile');
          // } else if (lowerCaseSpokenText.includes('dashboard')) {
          //   navigate('/dashboard')
          // } else if (lowerCaseSpokenText.includes('history')) {
          //   navigate('/history')
          // } else if (lowerCaseSpokenText.includes('upload')) {
          //   navigate('/upload')
          // }
        }
        if (voiceRef.current) {
          voiceRef.current.start()
        }
      }
    } else if (voiceRef.current) {
      // lowerCaseSpokenText = ''
      voiceRef.current.stop()
    }
  }

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)} onClick={handleMicrophoneClick}>
        <FontAwesomeIcon
          icon={faMicrophone}
          className='px-3'
          style={{
            height: '18px',
            color: isMicrophoneClicked ? 'blue' : 'black',
          }}
        />
      </div>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>
      <div className={clsx('app-navbar-item', itemClass)}>
        <a onClick={logout} className='menu-link px-5 mt-2'>
          <FontAwesomeIcon icon={faSignOutAlt} style={{height: '15px'}} />
        </a>
      </div>
    </div>
  )
}

export {Navbar}
