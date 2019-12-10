import { useCallback, useState, useRef, useEffect, useReducer } from 'react'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import { isClient } from 'utils/helpers'

export const useWindowDimensions = (delay = 300) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
  useEffect(() => {
    const update = () =>
      setDimensions({ height: window.innerHeight, width: window.innerWidth })
    const handleResize = debounce(update, delay)
    window.addEventListener('resize', handleResize)
    update()
    return () => window.removeEventListener('resize', handleResize)
  }, [delay])
  return dimensions
}

export const useScroll = (delay = 300) => {
  const frame = useRef(0)
  const [state, setState] = useState({
    x: isClient ? window.scrollX : 0,
    y: isClient ? window.scrollY : 0,
  })

  const updateScroll = useCallback(
    throttle(() => {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      })
    }, delay),
  )

  useEffect(() => {
    const handler = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    })

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return state
}

export const useScrollDirection = (threeshold = 15, delay = 300) => {
  const [direction, setDirection] = useState()
  const { y } = useScroll(delay) || { y: 0 }
  const prevY = usePrevious(y)

  if (direction !== 'DOWN' && y > prevY + threeshold) {
    setDirection('DOWN')
  }
  if (direction !== 'UP' && y < prevY - threeshold) {
    setDirection('UP')
  }

  return direction
}

export const useColumns = (splitFactor = 365) => {
  const { width } = useWindowDimensions()
  return width ? Math.round(width / splitFactor) : 2
}

export const useMedia = (media, defaultState = false) => {
  const [state, setState] = useState(defaultState)
  const query = get(
    {
      desktop: '(min-device-width: 992px)',
      tabletDown: '(max-device-width: 991px)',
      tabletUp: '(min-device-width: 768px)',
    },
    media,
    media,
  )
  useEffect(() => {
    if (!window.matchMedia) return null
    const mql = window.matchMedia(query)
    const onChange = () => setState(!!mql.matches)
    mql.addListener(onChange)
    setState(mql.matches)

    return () => mql.removeListener(onChange)
  }, [media, query])

  return state
}

export const useProcessOnce = (fn, value) => {
  const [result, setResult] = useState()
  useEffect(() => {
    if (!result) {
      setResult(fn(value))
    }
  }, [])
  return result || value
}

export const useOnMount = callback => {
  useEffect(() => {
    callback()
  }, [callback])
}

export const useOnUnmount = callback => {
  useEffect(() => callback, [callback])
}

export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  return isMounted
}

export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial)
  const toggler = () => setValue(!value)
  return [value, toggler]
}

export const useHtmlClass = (className, condition) => {
  useEffect(() => {
    const { classList } = document.documentElement
    const method = condition ? 'add' : 'remove'
    classList[method](className)
  }, [className, condition])
}

export const useSetState = initialState => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    initialState,
  )
  return [state, setState]
}

export const useSafeSetState = initialState => {
  const [state, setState] = useSetState(initialState)
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  const safeSetState = (...args) => mountedRef.current && setState(...args)
  return [state, safeSetState]
}

export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useDeepDiffEffect = (callback, values) => {
  const cleanup = useRef()
  useEffect(() => {
    if (!isEqual(previousValues, values)) {
      cleanup.current = callback()
    }
    return cleanup.current
  })
  const previousValues = usePrevious(values)
}
