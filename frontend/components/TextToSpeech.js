import React, { useState, useEffect, use } from "react";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from "@mui/material";

const TextToSpeech = ({ text }) => {

  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [utterance, setUtterance] = useState(null);


  useEffect(() => {

    const synth = window.speechSynthesis;

    const u = new SpeechSynthesisUtterance(text);


    setUtterance(u);


    return () => {
      setIsPaused(true);
    setIsStarted(false);
      synth.cancel();

    };

  }, [text]);


  const handlePlay = () => {
    console.log("play")
    const synth = window.speechSynthesis;


    if (isStarted) {

      synth.resume();

    }
   else {

    synth.speak(utterance);
    setIsStarted(true);
    
        }
    setIsPaused(false);

  };


  const handlePause = () => {

    const synth = window.speechSynthesis;


    synth.pause();


    setIsPaused(true);

  };


  const handleStop = () => {

    const synth = window.speechSynthesis;


    synth.cancel();

    setIsStarted(false);
    setIsPaused(true);

  };

  useEffect(() => { 
    
        if (utterance) {
    
        utterance.onend = () => {
    
            setIsPaused(true);
    
            setIsStarted(false);
    
        };
    
        }
    
    }, [utterance]);

  return (

    <div>

     
     
     {isPaused && <IconButton onClick={handlePlay}><PlayArrowIcon fontSize="large"/ ></IconButton>}
      
      {!isPaused && <IconButton onClick={handlePause}><PauseIcon fontSize="large" /></IconButton>}

      

      <IconButton  onClick={handleStop}><StopIcon fontSize="large" /></IconButton>

    </div>

  );

};


export default TextToSpeech;