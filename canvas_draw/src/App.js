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
      width: this.props.width,
      height: this.props.height,
      history: []
    }
  }
  canvas(){
    return this.myCanvas
  }
  ctx(){
    return this.myCanvas.getContext('2d')
  }
  clearCanvas = () => {
    this.setState({
      history: []
    })
    let ctx = this.ctx()
    ctx.clearRect(0, 0, this.state.width, this.state.height)
    if(this.state.backgroundImg){
      this.setBackgroundImg()
    }
  }
  componentDidMount = () => {
    // Set canvas strokes
    const ctx = this.ctx()
    this.clearCanvas()
    ctx.strokeStyle = this.state.color
    ctx.lineWidth = this.state.lineWidth

  }
  // Mouse events
  getMousePos = (e) => {
    let canvas = this.canvas()
    let rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  handleMouseDown = (e) => {
    // Update last position and set drawing as true
    let { x, y } = this.getMousePos(e)
    this.setState({
      lastPos: { x, y },
      isDrawing: true
    })
  }
  draw = (e) => {
    const ctx = this.ctx()
    if(this.state.isDrawing){
      // current evt position
      let {x, y} = this.getMousePos(e)
      ctx.beginPath()
      // draw from 
      ctx.moveTo(this.state.lastPos.x, this.state.lastPos.y)
      ctx.lineTo(x, y)
      ctx.stroke()
      this.setState({
        lastPos: {x, y}
      })
    }
  }
  handleMouseMove = (e) => {
    this.draw(e)
  }
  handleMouseUp = (e) => {
    e.preventDefault()
    // TODO: Improve undo function
    let dataURL = this.canvas().toDataURL()
    if (this.state.history.length > 15) {
      this.state.history.shift()
    }

    this.setState(prevState => ({
      isDrawing: false,
      history: prevState.history.concat(dataURL)
    }))
  }
  // Touch events
  getTouchPos = (e) => {
    let canvas = this.canvas()
    let rect = canvas.getBoundingClientRect()
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    }
  }
  handleTouchStart = (e) => {
    // workaround in react
    e.preventDefault()    // doesnt work in react !bug
    let touch = e.touches[0]
    // Simulate mouseevent
    let evt = {clientX: touch.clientX, clientY: touch.clientY}
    this.handleMouseDown(evt)
  }
  handleTouchMove = (e) => {
    e.preventDefault()    
    let touch = e.touches[0]
    let evt = {clientX: touch.clientX, clientY: touch.clientY}
    this.handleMouseMove(evt)
  }
  
  handleColorChange = (e) => {
    let ctx = this.ctx()
    ctx.strokeStyle = e.target.value
    this.setState({
      color: e.target.value
    })
  }

  setBackgroundImg = () => {
    let canvas = this.canvas()
    let ctx = this.ctx()
    let img = this.state.backgroundImg
    let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  // FILE BACKGROUND UPLOAD
  handleImageBackground = (e) => {
    this.clearCanvas()
    let reader = new FileReader()
    reader.onload = (e) => {
      let img = new Image()
      img.onload = async () => {
        // cache current background img
        await this.setState({backgroundImg: img})
        // update canvas background img
        this.setBackgroundImg()
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(e.target.files[0])
  }

  removeBackgroundImg = async () => {
    await this.setState({backgroundImg: null})
    this.clearCanvas()
    document.getElementById('imageLoader').value = ''
  }

  // DOWNLOAD IMAGE
  downloadImage = () => {
    let canvas = this.canvas()
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement('a')
    link.download = "my-image.png";
    link.href = image
    link.click()
  }
  restore = () => {
    let ctx = this.ctx()
    let history = this.state.history
    this.clearCanvas()

    let dataURL = history[history.length - 1]
        
    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }    
    img.src = dataURL
  }

  undo = () => {
    let history = this.state.history
    if(history.length >= 1) {
      history.pop()
    }
    this.setState({
      history
    })
    this.restore()
  }

  render() {
    return (
      <div>
        <p>Last Position = x: {this.state.lastPos.x}; y: {this.state.lastPos.y}</p>
        <select value={this.state.color} name="color" onChange={this.handleColorChange}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
        </select>
        <button onClick={this.clearCanvas}>Clear</button>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.downloadImage}>Download</button>
        <input id="imageLoader" type="file" onChange={this.handleImageBackground}/>
        <button onClick={this.removeBackgroundImg}>Remove Background</button>
        <br/>
        <canvas 
          // id="draw" 
          ref={canvas => this.myCanvas = canvas} // get access to this DOM element via this.myCanvas
          style={{border: '1px solid black'}} 
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleMouseUp}
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
        <Canvas width={500} height={500}/>
      </div>
    );
  }
}

export default App;
