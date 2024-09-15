import { useEffect, useState } from 'react';

// import logo from './logo.svg';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-video-player';
import './App.css';

const Stream = () => {


    const [fileDetected, setFileDetected] = useState(false)

    useEffect(() => {
        axios.get("/video").then(res => {
            console.log("res status: " + res.status)
    
            // look out for a status 200 to set state variable
            // this will toggle visibility for player
            if (res.status === 200) {
            console.log("res status is 200")
    
            setFileDetected(true)
            }
        })
        }, [])
    
        return (
        <div id="video-player" className="App">
            
            {/* only initiate the player when the output file is ready */}
            {/* using a state variable here to toggle visibility */}
            {fileDetected ?
            <ReactHlsPlayer
                url='https://rtsp.me/embed/arAnAy9y'
                autoplay={true}
                controls={true}
                width={640}
                height={480}
                muted="muted"
            />
            : null
            }
            <div>
            <iframe width="640" height="480" src="https://rtsp.me/embed/arAnAy9y/" allow="fullscreen" frameborder="0" onVolumeChange={e => console.log(e)}>
    
            </iframe>
            <p>powered by
            <a href="https://rtsp.me" title ='RTSP.ME - Free website RTSP video steaming service' target="_blank" >rtsp.me
            </a>
            </p>
            </div>
    
        </div>
    );
}

export default Stream;