import type { AppProps } from 'next/app';
import "./App.css";
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import getConfig from 'next/config';

export default function App({ Component, pageProps }: AppProps) {

  const [result, setResult] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png')
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState (false);
  const { publicRuntimeConfig } = getConfig();
  const apiKey = (typeof publicRuntimeConfig !== 'undefined' && publicRuntimeConfig.apiKey) ? publicRuntimeConfig.apiKey : process.env.APIKEY;
  if (!apiKey) {
    throw new Error('apiKey is not found in config file')
  }
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    })
    setLoading(false);
    const data = res.data;
    setResult(data.data[0].url || 'no image found');
  }

  return <div className='app-main'>
    <h2>Create images with your mind</h2>
    <textarea
      className='app-input'
      placeholder="Create any type of Image you can think of with as much added descrition as you would like"
      onChange={(e) => setPrompt(e.target.value)}
    />
    <button onClick={generateImage}>Generate Image</button>
    <>{loading ? (
      <>
        <h3>Artist Working</h3></>
    )
      : <img src={result} alt="result" />
    }
    </>
  </div>
}
