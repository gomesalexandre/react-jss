/* eslint-disable global-require, react/prop-types */

import expect from 'expect.js'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import RHL, {AppContainer} from 'react-hot-loader'
import injectSheet from '../index'

describe('hot reloading', () => {
  let ComponentA
  let ComponentB
  let ComponentC

  beforeEach(() => {
    ComponentA = injectSheet({button: {color: 'red'}})()
    ComponentB = injectSheet({button: {color: 'green'}})()
    ComponentC = injectSheet({button: {color: 'blue'}})()
  })

  after(() => {
    // Currently, when hot reloading, old sheets are left behind in the page, as
    // mentioned here:
    //   https://github.com/cssinjs/react-jss/pull/123#discussion_r130298137)
    // So we need to manually clean them up to make sure the other tests have a
    // clean document to begin with.
    const styles = document.querySelectorAll('style')
    for (let i = 0; i < styles.length; ++i) {
      styles[i].parentNode.removeChild(styles[i])
    }
  })

  it('should hot reload component and attach new sheets', () => {
    RHL.register(ComponentA, 'Component', 'test.js')
    const container = render(<AppContainer><ComponentA /></AppContainer>, node)

    expect(document.querySelectorAll('style').length).to.be(1)
    expect(document.querySelectorAll('style')[0].innerHTML).to.contain('color: red')

    RHL.register(ComponentB, 'Component', 'test.js')
    deepForceUpdate(container)

    // As noted above, old sheets are left behind in the page when hot reloading,
    // so this test needs to expect that behavior.
    expect(document.querySelectorAll('style').length).to.be(2)
    expect(document.querySelectorAll('style')[1].innerHTML).to.contain('color: green')

    RHL.register(ComponentC, 'Component', 'test.js')
    deepForceUpdate(container)

    expect(document.querySelectorAll('style').length).to.be(3)
    expect(document.querySelectorAll('style')[2].innerHTML).to.contain('color: blue')
  })
})
