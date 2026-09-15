import React from 'react';
import Navbar from "#components/Navbar.jsx";
import VideoBackground from "#components/VideoBackground.jsx";
import WelcomeGsapEffect from '#components/WelcomeGsapEffect';
import { Dock } from '#components';
import { MacNotification } from '#components/MacNotification.jsx';
import IPhoneHomeScreen from '#components/mobile/IPhoneHomeScreen.jsx';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

import {
  Terminal,
  Contact,
  Photos,
  Safari,
  Finder,
  TxtFile,
  ImgFile,
  Resume,
} from '#windows';
import {
  useAudioController,
  useSystemBrightness,
  useSystemNotification,
  useSystemTheme,
  useIsMobile,
} from './hooks';

const App = () => {
    const isMobile = useIsMobile(768);
    const { brightness, setBrightness, overlayOpacity } = useSystemBrightness(100);
    const { volume, setVolume, isPlaying, setIsPlaying } = useAudioController(35);
    const { notification, showNotification, clearNotification } = useSystemNotification();
    const { isDarkMode, toggleTheme } = useSystemTheme();

    return (
        <main className="relative w-screen h-screen overflow-hidden">
            {/* Real-time Display Brightness Dimmer Overlay */}
            <div
                className="screen-brightness-overlay"
                style={{ opacity: overlayOpacity }}
            />

            {/* macOS / iOS System Notification Toast */}
            <MacNotification
                notification={notification}
                onClose={clearNotification}
            />

            {isMobile ? (
                /* Mobile Native iOS iPhone Screen */
                <IPhoneHomeScreen
                    volume={volume}
                    setVolume={setVolume}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    onNotify={showNotification}
                />
            ) : (
                /* Desktop macOS Experience */
                <>
                    <VideoBackground volume={volume} setVolume={setVolume} isPlaying={isPlaying} />
                    <Navbar
                        volume={volume}
                        setVolume={setVolume}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        onNotify={showNotification}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                    />
                    <WelcomeGsapEffect />
                    <Dock />
                    <Terminal />
                    <Contact />
                    <Photos />
                    <Safari />
                    <Finder />
                    <TxtFile />
                    <ImgFile />
                    <Resume />
                </>
            )}
        </main>
    );
};

export default App;