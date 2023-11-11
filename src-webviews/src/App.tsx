import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { WebViewEvents } from '../../src/core/shared/webviewEvents';
import Chat from './Chat';

function App() {
    const [count, setCount] = useState(0);
    const [isVisible, setVisibility] = useState(false);

    function invokeEvent() {
        console.log('Test!');

        if ('alt' in window) {
            alt.emit('emitToClient');
        }
    }

    useEffect(() => {
        if (!alt) {
            return;
        }

        alt.on(WebViewEvents.toggleVisibility, (shouldBeVisible: boolean) => {
            setVisibility(shouldBeVisible);
        });
    }, []);

    return (
        <div>
            <Chat />
        </div>
    );
}

export default App;
