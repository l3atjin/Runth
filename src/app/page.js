"use client";
import Image from "next/image";
import MapComponent from "./components/map";
import { APIProvider } from '@vis.gl/react-google-maps';
import { OpenAIApi } from 'openai';
import PromptInput from "./components/propmtInput";


export default function Home() {
  return (
    <div className="">
      <h1>Welcome to Runth</h1>
      <PromptInput/>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
        <MapComponent/>
      </APIProvider>
    </div>
  );
}
