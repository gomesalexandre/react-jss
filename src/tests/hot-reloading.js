/* eslint-disable global-require, react/prop-types */

import expect from 'expect.js'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import injectSheet from '../index'

describe('hot reloading', () => {
  function simulateHotReloading(container, TargetClass, SourceClass) {
    // Crude imitation of hot reloading that does the job
    Object.getOwnPropertyNames(SourceClass.prototype)
      .filter(key => typeof SourceClass.prototype[key] === 'function')
      .forEach((key) => {
        if (key !== 'render' && key !== 'constructor') {
          TargetClass.prototype[key] = SourceClass.prototype[key]
        }
      })

    deepForceUpdate(container)
  }

  let ComponentA
  let ComponentB
  let ComponentC

  beforeEach(() => {
    ComponentA = injectSheet({button: {color: 'red'}})()
    ComponentB = injectSheet({button: {color: 'green'}})()
    ComponentC = injectSheet({button: {color: 'blue'}})()
  })

  it.only('should hot reload component and attach new sheets', () => {
    const container = render(<ComponentA />, node)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: red')

    simulateHotReloading(container, ComponentA, ComponentB)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: green')

    simulateHotReloading(container, ComponentA, ComponentC)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: blue')
  })

  it('should properly detach sheets on hot reloaded component', () => {
    // eslint-disable-next-line react/prefer-stateless-function,react/no-multi-comp
    class AppContainer extends React.Component {
      render() {
        return (
          <ComponentA
            {...this.props}
            key={Math.random()} // Require children to unmount on every render
          />
        )
      }
    }

    const container = render(<AppContainer />, node)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: red')

    simulateHotReloading(container, ComponentA, ComponentB)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: green')

    simulateHotReloading(container, ComponentA, ComponentC)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: blue')
  })
})
