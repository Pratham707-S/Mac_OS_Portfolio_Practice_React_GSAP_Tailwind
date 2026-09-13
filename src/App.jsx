import React from 'react'
import Navbar from "#components/Navbar.jsx"
import VideoBackground from "#components/VideoBackground.jsx"

import WelcomeGsapEffect from '#components/WelcomeGsapEffect'

const App = () => {
    return (
        <main>
            <VideoBackground />
            <Navbar />
            <WelcomeGsapEffect/>
        </main>
    )
}

export default App