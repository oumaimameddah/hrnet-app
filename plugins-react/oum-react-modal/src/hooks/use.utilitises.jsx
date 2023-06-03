import {useEffect} from "react";

export const useClickOutside = (ref, isOpened, handler) => {

    useEffect(() => {
        const listener = (event) => {
            if (!isOpened || !ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, isOpened, handler]);
};

export const useKeypress = (key, isOpened, handler) => {
    useEffect(() => {
        const onKeydown = (event) => {
            if (!isOpened) {
                return;
            }

            if (event.key === key) {
                handler(event);
            }
        };
        document.addEventListener("keydown", onKeydown);
        return () => {
            document.removeEventListener("keydown", onKeydown);
        };
    }, [key, isOpened, handler]);
};

export const useTrapFocus = (ref, isOpened) => {
    useEffect(() => {
        const handleTabKey = (e) => {
            const focusableElements = ref.current.querySelectorAll(
                'a[href], area[href], input:not([disabled],[tabindex="-1"]), select:not([disabled],[tabindex="-1"]), textarea:not([disabled],[tabindex="-1"]), button:not([disabled],[tabindex="-1"]), *[tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                return e.preventDefault();
            }

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        };
        const keyListenersMap = new Map([[9, handleTabKey]]);

        if (isOpened) {
            const keyListener = (e) => {
                const listener = keyListenersMap.get(e.keyCode);
                return listener && listener(e);
            };
            document.addEventListener("keydown", keyListener);

            return () => document.removeEventListener("keydown", keyListener);
        }
    }, [ref, isOpened]);
};

