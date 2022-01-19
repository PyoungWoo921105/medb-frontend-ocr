import { useState } from "react";
import "./App.css";

function App() {
  const { createWorker, PSM } = require("tesseract.js");
  const worker = createWorker();

  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event: any) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = async () => {
    await worker.load();
    await worker.loadLanguage("kor+eng");
    await worker.initialize("kor+eng");
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    const {
      data: { text },
    } = await worker.recognize(imagePath);
    console.log(text);
    setText(text);
    await worker.terminate();
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Actual imagePath uploaded</h3>
        <img src={imagePath} className="App-image" alt="" />

        <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{ height: 50 }}>
          {" "}
          convert to text
        </button>
      </main>
    </div>
  );
}

export default App;
