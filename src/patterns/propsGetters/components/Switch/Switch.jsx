import './switch.styles.css'
import * as React from 'react'

// this is here to fill in for the onChange handler
// we're not using onChange because it seems to behave
// differently in codesandbox and locally :shrug:
const noop = () => {}

class Switch extends React.Component {
  render() {
    const {
      on,
      className = '',
      'aria-label': ariaLabel,
      onClick,
      ...props
    } = this.props
    const btnClassName = [
      className,
      'toggle-btn',
      on ? 'toggle-btn-on' : 'toggle-btn-off',
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <label aria-label={ariaLabel || 'Toggle'} style={{display: 'block'}}>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={noop}
          onClick={onClick}
          data-testid="toggle-input"
        />
        <span className={btnClassName} {...props} />
      </label>
    )
  }
}

export { Switch }
