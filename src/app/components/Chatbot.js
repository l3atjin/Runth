import React, { useState } from 'react';
import { OpenAI} from 'openai';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const openai = new OpenAI(
    {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      dangerouslyAllowBrowser: true
    }
  );

  async function send_msg() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  }

  send_msg()
  return (
    <div>
      <p>Chat GPT</p>
    </div>
  );
};

export default Chatbot;