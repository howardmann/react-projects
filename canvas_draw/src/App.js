import React from 'react';

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red',
      lineWidth: 3,
      isDrawing: false,
      lastPos: {x: 0, y: 0},
      backgroundImg: null,
      width: 500,
      height: 500,
      history: []
    }
  }
  canvas(){
    return document.querySelector("#draw")
  }
  ctx(){
    return this.canvas().getContext('2d')
  }
  componentDidMount = () => {
    const ctx = this.ctx()
    ctx.strokeStyle = this.state.color
    ctx.lineWidth = this.state.lineWidth
  }
  handleColor = () => {
    const ctx = this.ctx()
    ctx.strokeStyle = this.state.color
  }
  draw = (e) => {
    const ctx = this.ctx()
    if(this.state.isDrawing){
      let {offsetX, offsetY} = e.nativeEvent
      ctx.beginPath()
      ctx.moveTo(this.state.lastPos.x, this.state.lastPos.y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
      this.setState({
        lastPos: {x: offsetX, y: offsetY}
      })
    }
  }

  handleMouseDown = (e) => {
    let {offsetX, offsetY} = e.nativeEvent
    this.setState({
      lastPos: {x: offsetX, y: offsetY},
      isDrawing: true
    })
  }

  handleMouseMove = (e) => {
    this.draw(e)
  }

  clearCanvas = () => {
    let ctx = this.ctx()
    // Clears canvas
    ctx.clearRect(0, 0, this.state.width, this.state.height)
  }

  restore = () => {
    let ctx = this.ctx()
    let history = this.state.history
    let dataURL = history[history.length - 1]
    
    
    let img = new Image()
    img.onload = () => {
      this.clearCanvas()
      ctx.drawImage(img, 0, 0);
    }    
    img.src = dataURL
    
    
  }

  undo = () => {
    let history = this.state.history
    if(history.length > 1) {
      history.pop()
    }
    this.setState({
      history
    })
    this.restore()
  }

  handleMouseUp = () => {
    let dataURL = this.canvas().toDataURL()
    if (this.state.history.length > 5) {
      this.state.history.shift()
    }

    this.setState(prevState => ({
      isDrawing: false,
      history: prevState.history.concat(dataURL)
    }))
  }

  render() {
    return (
      <div>
        <p>Last Position = x: {this.state.lastPos.x}; y: {this.state.lastPos.y}</p>
        <button onClick={this.handleColor}>Change Color</button>
        <button onClick={this.undo}>Undo</button>
        <br/>
        <canvas 
          id="draw" 
          style={{border: '1px solid black'}} 
          width={this.state.width} 
          height={this.state.height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        ></canvas>        
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">          
        <h1>Hi</h1>
        <Canvas/>
      </div>
    );
  }
}

export default App;
