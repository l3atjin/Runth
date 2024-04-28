import React, { useState, useEffect } from 'react';
import { OpenAI } from 'openai';
import Lottie from 'react-lottie-player';

const PromptInput = ( {onWeightChange} ) => {
  const [input, setInput] = useState('');
  const [animationData, setAnimationData] = useState(null);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true
  });

  useEffect(() => {
    // Load the Lottie JSON file from the public folder
    fetch('/animation.json')  // This path assumes your JSON file is named `animation.json` and located directly in the `public` folder
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading the animation:', error));
  }, []);

  async function sendPromptToGPT() {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a user's input about how they want to have their jog, and your task is to infer the user's preference on safety, scenery, and traffic level on a scale of 1-10 with 1 being they don't care about it at all and 10 being they care about it a lot. You output 3 numbers in the order of safety, scenery, and traffic level."
        },
        {
          "role": "user",
          "content": input
        }
      ],
      temperature: 0.2,
      max_tokens: 64,
      top_p: 0.4,
    });
    console.log(response.choices[0].message.content)
    const str = response.choices[0].message.content;
    const numbers = str.split(",").map(num => parseInt(num.trim()));

    console.log(numbers); // Output: [7, 9, 5]
    onWeightChange(numbers)
  }

  return (
    <div className="mt-4">
      <textarea
        className="w-full h-32 p-4 text-black bg-white border border-gray-300 rounded-md"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Hey Runth, today I want to run with a nice city view with flat surface around the Financial District..."
      />
      <button 
        className="mt-4 px-6 py-2 text-white rounded-md mb-5"
        style={{ backgroundColor: '#818cf8' }}
        onClick={sendPromptToGPT}
      >
        Submit
      </button>
      {animationData && (
        <Lottie 
          animationData={animationData}
          play
          loop
          style={{ width: '100%', height: 'auto', maxWidth: '400px', margin: 'auto' }}
        />
      )}
    </div>
  );
};

export default PromptInput;
