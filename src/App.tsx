import React, { useState } from 'react';
import './App.css';
import LoadingPage from './LoadingPage/LoadingPage.jsx';
import Tesseract from "tesseract.js";
import { PSM } from "tesseract.js";

const App: React.FC = () => {
  const [result, setresult] = useState('');
  const [img, setimg] = useState('');
  const [isLoading, setisLoading] = useState(false)

  const SetImage = (event: any) => {
    setimg(event.target.value)
  }

  const pCursor = {
    cursor: 'pointer',
  };

  const pNone = {
    cursor: 'pointer',
  };

  const handleImage = (e: any) => {
    setimg(URL.createObjectURL(e.target.files[0]));
  }

  const GetText = async () => {
    setresult('');
    setisLoading(true)
    if (img !== '' && img !== undefined) {
      const { createWorker } = Tesseract;
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
      })
      let s_img: any = img;
      const { data: { text } } = await worker.recognize(s_img);
      console.log(await worker.recognize(s_img))
      setresult(text);
      setisLoading(false)
      await worker.terminate();
    } else {
      alert("Nothing to recognize");
    }
  }

  return (
    <div className="App">
      <head>
        <title>Grammar Checker</title>
        <link color="white" rel="icon" href="/mark.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" />
      </head>
      <nav>
        <h2>TextFromImage</h2>
      </nav>
      <div className='outer_box'>
        <div className='inner_box'>
          <div className='input'>
            <h4>Add a URL or Browse for one on your system</h4>
            <p>Add an image that is clear and the text on it is easily visible</p>
            <input className='url_image' onChange={SetImage} />
            <label className="inputTag">
              Select Image
              <input className='file_image' id="inputTag" type="file" onChange={handleImage}/>
            </label>
            <button onClick={GetText}>Get Text</button>
            {(img !== '' && img !== undefined) && <img src={img} alt='an_image' />}
          </div>
          <div className='output'>
            {result && <p>{result}</p>}
            {isLoading && (result === '' || result === undefined) && 
              <LoadingPage />
            }
          </div>
        </div>
      </div>
      <footer>
          <p style={pNone}>Built by <a href="https://www.jeffawe.com" style={pCursor}> Jeffery Ozoekwe-Awagu </a> with tesseractjs</p>
          <p>Icon by Font Awesome</p>
        </footer>
    </div>
  );
}

export default App;
