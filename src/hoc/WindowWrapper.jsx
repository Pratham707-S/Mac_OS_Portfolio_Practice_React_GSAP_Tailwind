import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const windowState = windows[windowKey];
        const isOpen = windowState?.isOpen;
        const zIndex = windowState?.zIndex;
        const ref = useRef(null);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? 'block' : 'none';
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }
            );
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
            });

            return () => instance.kill();
        }, []);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute"
                onClick={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
};

export default WindowWrapper;