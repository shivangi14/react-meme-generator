import React from "react"

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state={
            topText: "",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.generateMeme = this.generateMeme.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
                .then(response => {
                    this.setState(
                        {
                            allMemeImgs : response.data.memes
                        }
                     )
                })
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState(
            {
                [name]:value
            }
        )
    }

    generateMeme(event){
        event.preventDefault()  //to stop from loading again
        let randomValue = Math.floor(Math.random() * this.state.allMemeImgs.length)
        let memeUrl = this.state.allMemeImgs[randomValue].url
        this.setState(
            {
                randomImg : memeUrl
            }
        )
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.generateMeme}>
                    <label>Top text
                        <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>Bottom text
                        <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="meme" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator