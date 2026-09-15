import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useWindowStore from '#store/window';
import React, { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Dock = () => {
    const { openWindow, focusWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = Array.from(dock.querySelectorAll(".dock-icon"));
        let iconCenters = [];
        let dockLeft = 0;
        let rafId = null;

        const updateDockBounds = () => {
            const dockRect = dock.getBoundingClientRect();
            dockLeft = dockRect.left;
            iconCenters = icons.map(icon => {
                const rect = icon.getBoundingClientRect();
                return {
                    icon,
                    center: rect.left - dockLeft + rect.width / 2
                };
            });
        };

        const handleMouseMove = (e) => {
            if (!iconCenters.length) updateDockBounds();
            const mouseX = e.clientX - dockLeft;

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                iconCenters.forEach(({ icon, center }) => {
                    const distance = Math.abs(mouseX - center);
                    const intensity = Math.exp(-(distance ** 2) / 3500);

                    gsap.to(icon, {
                        scale: 1 + 0.35 * intensity,
                        y: -10 * intensity,
                        transformOrigin: "bottom center",
                        duration: 0.15,
                        ease: "power1.out",
                        overwrite: "auto",
                    });
                });
            });
        };

        const resetIcons = () => {
            if (rafId) cancelAnimationFrame(rafId);
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    transformOrigin: "bottom center",
                    duration: 0.25,
                    ease: 'power1.out',
                    overwrite: "auto",
                });
            });
            iconCenters = [];
        };

        dock.addEventListener('mouseenter', updateDockBounds, { passive: true });
        dock.addEventListener('mousemove', handleMouseMove, { passive: true });
        dock.addEventListener('mouseleave', resetIcons, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            dock.removeEventListener('mouseenter', updateDockBounds);
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);
        };
    }, []);

    const toggleApp = (app) => {
        if (!app.canOpen) return;

        if (app.id === 'trash') {
            openWindow('finder', { location: 'trash' });
            focusWindow('finder');
            return;
        }

        const win = windows[app.id];
        if (!win) return;

        if (!win.isOpen) {
            openWindow(app.id);
        } else {
            // Focus and bring to front like real macOS!
            focusWindow(app.id);
        }
    };

    return (
        <section id='dock'>
            <div ref={dockRef} className='dock-container'>
                {dockApps.map(({ id, name, icon, canOpen }) => {
                    const isAppOpen =
                        id === 'trash'
                            ? windows.finder?.isOpen && windows.finder?.data?.location === 'trash'
                            : windows[id]?.isOpen;

                    return (
                        <div key={id} className='relative flex flex-col items-center justify-center'>
                            <button
                                type='button'
                                className='dock-icon relative'
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
                            {/* macOS Running App Indicator Dot */}
                            {isAppOpen && (
                                <span className="w-1 h-1 rounded-full bg-white/90 absolute -bottom-1 shadow-[0_0_4px_rgba(255,255,255,0.8)] pointer-events-none" />
                            )}
                        </div>
                    );
                })}
                <Tooltip id='dock-tooltip' place='top' className='tooltip' />
            </div>
        </section>
    );
};

export default Dock;