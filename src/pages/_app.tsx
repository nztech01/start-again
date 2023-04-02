import type { AppProps } from 'next/app'
import "./App.css"

export default function App({ Component, pageProps }: AppProps) {
  return <div className='app-main'>
    <h2>Create images with your mind</h2>
    <textarea
      className="app-input"
      placeholder="Create any type of Image you can think of with as much added descrition as you would like"
    />
    <button>Generate Image</button>
  </div>

}
