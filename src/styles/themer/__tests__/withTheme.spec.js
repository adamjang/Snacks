import React from 'react'
import renderer from 'react-test-renderer'
import withTheme from '../withTheme'
import { defaultTheme, themePropTypes } from '../utils'

const TestComponent = withTheme(
  class extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      return (
        <div
          style={{
            backgroundColor: this.props.snacksTheme.colors.primaryBackground
          }}
        >
          Hello
        </div>
      )
    }
  }
)

TestComponent.propTypes = { snacksTheme: themePropTypes }

it('renders without error with default theme', () => {
  const tree = renderer
    .create(
      <TestComponent />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

describe('while in production mode', () => {
  beforeAll(() => {
    global.__DEV__ = false
  })

  afterAll(() => {
    global.__DEV__ = true
  })

  it('can be overridden', () => {
    const testColor = 'red'
    const tree = renderer
      .create(
        <TestComponent snacksTheme={{
          colors: {
            primaryBackground: testColor
          }
        }} />
      ).toJSON()
    expect(tree.props.style.backgroundColor).toBe(testColor)
  })

  it('falls back to active themer theme if props are invalid', () => {
    [null, undefined].map((invalidTheme) => {
      const tree = renderer
        .create(
          <TestComponent snacksTheme={invalidTheme} />
        ).toJSON()
      expect(tree.props.style.backgroundColor).toBe(defaultTheme.colors.primaryBackground)
    })
  })
})

describe('while in development mode', () => {
  beforeEach(() => {
    global.__DEV__ = true
    // we can stop swallowing these when this is finished
    // https://github.com/facebook/react/issues/11098
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => { })
  })

  afterEach(() => {
    global.console.error.mockRestore()
  })
  it('throws an error on invalid snacksTheme', () => {
    const createTree = () => renderer
      .create(
        <TestComponent snacksTheme={1} />
      ).toJSON()
    expect(() => createTree()).toThrow()
  })
})

