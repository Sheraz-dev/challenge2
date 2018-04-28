var React = require('React')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  getInitialState: () => {
    return { border: '' }
  },
  render: function () {
    const { species, xAxis, yAxis } = this.props

    const background = (() => {
      if (species === 'setosa') {
        return '#ff7f0e'
      }
      if (species === 'versicolor') {
        return '#2ca02c'
      }
      if (species === 'virginica') {
        return '#1f77b4'
      }
    })()
    const pointStyle = {
      background,
      width: '10px',
      height: '10px',
      position: 'absolute',
      left: xAxis,
      bottom: yAxis,
      cursor: 'pointer',
      borderRadius: '5px',
      border: this.state.border
    }
    return (
      <div
        style={pointStyle}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {' '}
      </div>
    )
  },
  mouseLeave: function (e) {
    this.setState({ border: '' })

    const { pointMouseLeave } = this.props
    pointMouseLeave()
  },
  mouseEnter: function (e) {
    this.setState({ border: '0.5px solid white' })
    const { pointMouseEnter } = this.props
    const {
      sepalLength,
      sepalWidth,
      petalLength,
      petalWidth,
      species,
      i
    } = this.props
    pointMouseEnter({
      i,
      species,
      petalWidth,
      petalLength,
      sepalWidth,
      sepalLength
    })
  }
})
