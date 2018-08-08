let makeHandleInputChange = (context) => e => {
  let name = e.target.name
  let value = e.target.value
  context.setState({
    ...context.state,
    [name]: value
  })
}

module.exports = makeHandleInputChange