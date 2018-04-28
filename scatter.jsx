var React = require('React')
var linmap = require('linmap')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')
var Point = require('./Point.jsx')
var Stats = require('./Stats.jsx')

module.exports = createReactClass({
  getInitialState: () => {
    return {
      points: [],
      Stats: null
    }
  },
  render: function () {
    const { width, height } = this.props
    const { points, Stats } = this.state
    return (
      <div
        style={{
          width: width,
          height: height,
          background: '#222',
          position: 'relative',
          border: '1px solid black',
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        {Stats && Stats}
        {points}
      </div>
    )
  },

  componentWillMount: function () {
    const datasetURL = this.props.dataset
    this.getDataset(datasetURL, (err, datasetJSON) => {
      if (err) {
        return err
      }
      this.renderPoints(datasetJSON)
    })
  },
  renderPoints: function (datasetJSON) {
    const points = datasetJSON.map((point, key) => {
      const xAxis = this.calculateXaxis(point.petalWidth)
      const yAxis = this.calculateYaxis(point.petalLength)
      return (
        <Point
          key={key}
          i={key}
          {...point}
          xAxis={xAxis}
          yAxis={yAxis}
          pointMouseEnter={this.pointMouseEnter}
          pointMouseLeave={this.pointMouseLeave}
        />
      )
    })
    this.setState({ points })
  },
  calculateXaxis: function (pointWidth) {
    return linmap(0.1, 2.52, 0, this.props.width, pointWidth)
  },
  calculateYaxis: function (pointHeight) {
    return linmap(1, 6.95, 0, this.props.height, pointHeight)
  },
  getDataset: function (datasetURL, cb) {
    return jsonist.get(datasetURL, (err, data, res) => {
      if (err) {
        cb(err, null)
      }
      cb(null, data)
    })
  },
  pointMouseEnter: function (data) {
    const StatsComponent = <Stats {...data} />
    this.setState({ Stats: StatsComponent })
  },
  pointMouseLeave: function () {
    this.setState({ Stats: null })
  }
})
