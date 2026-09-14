import React from 'react'
import Navbar from "#components/Navbar.jsx"
import VideoBackground from "#components/VideoBackground.jsx"

import WelcomeGsapEffect from '#components/WelcomeGsapEffect'
import { Dock } from '#components'

const App = () => {
    return (
        <main>
            <VideoBackground />
            <Navbar />
            <WelcomeGsapEffect/>
            <Dock/>
        </main>
    )
}

export default App