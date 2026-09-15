import React from 'react';
import Navbar from "#components/Navbar.jsx";
import VideoBackground from "#components/VideoBackground.jsx";
import WelcomeGsapEffect from '#components/WelcomeGsapEffect';
import { Dock } from '#components';
import { MacNotification } from '#components/MacNotification.jsx';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

import { Terminal, Contact, Photos, Safari, Finder } from '#windows';
import {
  useAudioController,
  useSystemBrightness,
  useSystemNotification,
} from './hooks';

const App = () => {
    const { brightness, setBrightness, overlayOpacity } = useSystemBrightness(100);
    const { volume, setVolume, isPlaying, setIsPlaying } = useAudioController(0);
    const { notification, showNotification, clearNotification } = useSystemNotification();

    return (
        <main className="relative w-screen h-screen overflow-hidden">
            {/* Real-time Display Brightness Dimmer Overlay */}
            <div
                className="screen-brightness-overlay"
                style={{ opacity: overlayOpacity }}
            />

            {/* macOS System Notification Toast */}
            <MacNotification
                notification={notification}
                onClose={clearNotification}
            />

            <VideoBackground volume={volume} isPlaying={isPlaying} />
            <Navbar
                volume={volume}
                setVolume={setVolume}
                brightness={brightness}
                setBrightness={setBrightness}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                onNotify={showNotification}
            />
            <WelcomeGsapEffect />
            <Dock />
            <Terminal />
            <Contact />
            <Photos />
            <Safari />
            <Finder />
        </main>
    );
};

export default App;