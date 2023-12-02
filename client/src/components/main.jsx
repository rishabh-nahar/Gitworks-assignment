import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SpeechToText = () => {
    let [_listening, setListening] = useState(false)
    const [myArray, setMyArray] = useState([]);

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
    }
  const handleStart = () => {
   SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleToggleListening = () => {
    setListening(!_listening);
    _listening ? handleStart() : handleStop();
  };

  function copyTranscript(className) {
    const div = document.querySelector(`.${className}`);
  
    if (!div) {
      console.error(`Element with class '${className}' not found.`);
      return;
    }
  
    const textToCopy = div.innerText;
  
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard.', err);
      });
  }




  return (
   <>
    <div className={`container ${listening ? 'type2' : ''}`}>
        <div>

                {
                    transcript?
                        <div className='text-transcript'>
                            
                            <div className='transcript-in-english'>{transcript}</div>
                            <i onClick={e=>copyTranscript('transcript-in-english')} className="fa fa-copy"></i>
                        
                        </div>
                    :
                        <></>
                }

        </div>
        <div>
            <button className={`btn ${listening ? 'm-left' : ''}`} onClick={handleToggleListening}>
                <div className={`pulse-ring ${listening ? '' : 'delay' }`}></div>
                    {listening ? <i className="fa fa-microphone" aria-hidden="true"></i> : <i className="fa fa-microphone" aria-hidden="true"></i>}
            </button>
        </div>
    </div>
    <ToastContainer />
   </>
  );
};

export default SpeechToText;
