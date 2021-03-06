import Text from '../Text'
import React from 'react'
import renderer from 'react-test-renderer'
import { StyleRoot } from 'radium'

const getComponent = props => (
  <StyleRoot>
    <Text {...props}>Don't talk about snacks</Text>
  </StyleRoot>
)

describe('Text', () => {
  it('renders all typography variants correctly', () => {
    const variants = [
      'T.92',
      'T.82',
      'T.72',
      'T.64',
      'T.58',
      'T.46',
      'T.36',
      'T.28',
      'T.22',
      'T.18',
      'T.16',
      'T.14',
      'T.12',
      'T.11'
    ]

    variants.forEach(variantName => {
      const tree = renderer.create(getComponent({ variant: variantName })).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it('applies custom inline styles', () => {
    const component = getComponent({ variant: 'T.14', style: { marginBottom: '10px' } })
    const tree = renderer.create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('applies a custom html element type', () => {
    const component = getComponent({ elementType: 'span', variant: 'T.14' })
    const tree = renderer.create(component).toJSON()

    // Using `children` since the Radium wrapper will be the root node.
    expect(tree.children[0].type).toEqual('span')
  })

  it('applies a custom font weight', () => {
    const component = getComponent({ variant: 'T.28', fontWeight: 'semiBold' })
    const tree = renderer
      .create(component)
      .toJSON()

    expect(tree.children[0].props.style.fontWeight).toEqual(600)
  })
})
