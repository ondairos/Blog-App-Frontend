import { useState, forwardRef, useImperativeHandle } from 'react'
// The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // The component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component.
  useImperativeHandle(refs, () => { return { toggleVisibility } })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable