"use client";
import Image from "next/image";
import MapComponent from "./components/map";
import { OpenAIApi } from 'openai';
import Chatbot from "./components/Chatbot";


export default function Home() {
  return (
    <div className="">
      <h1>Welcome to Runth</h1>
      <Chatbot/>
      <MapComponent/>
      
    </div>
  );
}
