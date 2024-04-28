import React, { useState } from 'react';
import { OpenAI, OpenAIApi } from 'openai';
import { Yellowtail } from 'next/font/google';

const PromptInput = () => {
  const [input, setInput] = useState('');

  // const configuration = new Configuration({
  //   apiKey: API_KEY,
  // });

  // neutral:
  // 1 - 4 - g
  // 6 - 7 - y
  // 8 - 10 - r

  // high:
  // 1 - 2 - g
  // 3 - 4 - y
  // 5 - 10 - r

  // Zipcode -> Runnable_Index 

  
  // [
  //   94501: {
  //   safety_idx: 9,
  //   scenery: 2,
  //   traffic: 5
  // },
  // 94120: {
  //   safety_idx: 9,
  //   scenery: 2,
  //   traffic: 5
  // }
  // ]

  // Runnable_Index = W1*(safety) + W2*(scenery) + W3*(traffic)
  // 30> green
  // 20-30 yellow
  // <20 red


  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true
  });

  async function sendPromptToGPT() {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a user's input about how they want to have their jog, and your task is to infer the user's preference on safety and scenery on a scale of 1-10 with 1 being they don't care about it at all and 10 being they care about it a lot. You output 2 numbers in the order of safety and scenery."
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
    console.log("response", response.choices[0].message.content)
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your preferences..."
      />
      <button onClick={sendPromptToGPT}>Submit</button>
    </div>
  );
};

export default PromptInput;