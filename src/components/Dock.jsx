import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from '#store/window';
import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Dock = () => {
    const {openWindow, closeWindow, windows} = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left: dockLeft } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - dockLeft + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2) / 3500);

                gsap.to(icon, {
                    scale: 1 + 0.35 * intensity,
                    y: -10 * intensity,
                    transformOrigin: "bottom center",
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const resetIcons = () => {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    transformOrigin: "bottom center",
                    duration: 0.3,
                    ease: 'power1.out',
                });
            });
        };

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcons);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);
        };
    }, []);

    const toggleApp = (app) => {
       if(!app.canOpen) return;
       
       if (app.id === 'trash') {
         openWindow('finder', { location: 'trash' });
         return;
       }

       const window = windows[app.id];

       if(window.isOpen){
        closeWindow(app.id);
       }else{
        openWindow(app.id);
       }
     };

    return (
        <section id='dock'>
            <div ref={dockRef} className='dock-container'>
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className='relative flex justify-center'>
                        <button
                            type='button'
                            className='dock-icon'
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}>
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading='lazy'
                                className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id='dock-tooltip' place='top' className='tooltip' />
            </div>
        </section>
    );
};

export default Dock;