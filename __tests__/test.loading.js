/**
 * https://github.com/facebook/jest
 *
 * DO NOT USE LIKE THIS
 * jest.dontMock('xxx')
 */

import './do.not.mock.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Loading from '../assets/js/components/loading.jsx'

describe('Loading Component', function() {
  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(<Loading />)
  const loading = shallowRenderer.getRenderOutput()

  it('should have a div as container', function() {
    expect(loading.type).toEqual('div')
  })

  it('should only contain the text "Loading" when props.done is false', function() {
    expect(loading.props.children[0]).toContain('Loading')
    expect(loading.props.children[1]).toBeUndefined()
  })

  it('should contain empty text "Loading" and children when props.done is true', function() {
    let render = TestUtils.createRenderer()
    let child = <strong>child</strong>
    render.render(<Loading done>{child}</Loading>)
    const loading2 = render.getRenderOutput()
    expect(loading2.props.children[0]).toEqual('')
    expect(loading2.props.children[1]).toEqual(child)
  })
})
