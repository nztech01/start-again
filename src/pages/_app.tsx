import type { AppProps } from 'next/app';
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import getConfig from "next/config";

export default function App({ Component, pageProps }: AppProps) {

  const { publicRuntimeConfig } = getConfig();
  const apiKey = (typeof publicRuntimeConfig !== 'undefined' && publicRuntimeConfig.apiKey) ? publicRuntimeConfig.apiKey : process.env.APIKEY;
  if (!apiKey) {
    throw new Error('apiKey is not found in config file')
  }
  const configeration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configeration)

  const generateImage = async () => {

    const res = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024"
    })
    const data = res.data;
  }

  return <div className='app-main'>
    <h2>Create images with your mind</h2>
    <textarea
      className="app-input"
      placeholder="Create any type of Image you can think of with as much added descrition as you would like"
    />
    <button onClick={generateImage}>Generate Image</button>
  </div>
  }
