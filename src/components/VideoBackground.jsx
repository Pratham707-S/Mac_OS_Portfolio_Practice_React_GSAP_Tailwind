const VideoBackground = () => {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
            <source src="/video-background/PinGrab_1789291718783.mp4" type="video/mp4" />
        </video>
    )
}

export default VideoBackground
