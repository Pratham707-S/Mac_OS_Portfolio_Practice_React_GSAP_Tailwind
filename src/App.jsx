import React, { useState } from 'react';
import Navbar from "#components/Navbar.jsx";
import VideoBackground from "#components/VideoBackground.jsx";
import WelcomeGsapEffect from '#components/WelcomeGsapEffect';
import { Dock } from '#components';
import { MacNotification } from '#components/MacNotification.jsx';

const App = () => {
    const [brightness, setBrightness] = useState(100);
    const [volume, setVolume] = useState(25); // Starts at soft 25% ambient volume
    const [isPlaying, setIsPlaying] = useState(true);
    const [notification, setNotification] = useState(null);

    const showNotification = (title, message) => {
        setNotification({ title, message, id: Date.now() });
    };

    return (
        <main className="relative w-screen h-screen overflow-hidden">
            {/* Real-time Display Brightness Dimmer Overlay */}
            <div
                className="screen-brightness-overlay"
                style={{ opacity: (100 - brightness) / 125 }}
            />

            {/* macOS System Notification Toast */}
            <MacNotification
                notification={notification}
                onClose={() => setNotification(null)}
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
        </main>
    );
};

export default App;