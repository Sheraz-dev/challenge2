var React = require('React')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  render: function () {
    const data = this.getData()

    return (
      <table style={{ width: '10%', color: '#D3D3D3' }}>
        <tbody>{data}</tbody>
      </table>
    )
  },
  getData: function () {
    const keys = Object.keys(this.props)
    const data = keys.map((key, i) => {
      return (
        <tr key={i}>
          <td>{key}</td>
          <td>{this.props[key]}</td>
        </tr>
      )
    })
    return data
  }
})
