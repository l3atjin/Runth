"use client";
import Image from "next/image";
import MapComponent from "./components/map";
import { APIProvider } from '@vis.gl/react-google-maps';
import { OpenAIApi } from 'openai';
import PromptInput from "./components/propmtInput";


export default function Home() {
  return (
    <div className="flex flex-wrap min-h-screen bg-white">
      <div className="w-full lg:w-2/3 p-12">
        <h1 className="font-sans text-4xl font-bold mb-4" style={{ color: '#3730a3' }} >RUNTH</h1>
        <hr className="border-2 border-red-400 mb-4" />
        <h1 className="font-rounded text-6xl font-bold mb-4" style={{ color: '#a5b4fc' }}>SAFETY <br /> STEADINESS <br /> SCENERY </h1>
        <p className="mt-4 text-gray-500">Describe your ideal running today with Runth!</p>
        <PromptInput />
      </div>
      <div className="w-1/2 lg:w-1/3 p-12">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <MapComponent />
          </div>
        </APIProvider>
      </div>
    </div>
  );
}

