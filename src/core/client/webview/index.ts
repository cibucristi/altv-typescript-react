import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewEvents } from '../../shared/webviewEvents';

const F2_KEY = 113;
export let view: alt.WebView;
view = new alt.WebView('http://assets/webviews/index.html');
view.focus();
let isFocused = false;

export function focusWebView() {
    if (isFocused) {
        view.unfocus();
        view.emit(WebViewEvents.toggleVisibility, false);
        alt.showCursor(false);
        alt.toggleGameControls(true);
        native.triggerScreenblurFadeOut(100);
        isFocused = false;
    } else {
        view.focus();
        view.emit(WebViewEvents.toggleVisibility, true);
        alt.showCursor(true);
        alt.toggleGameControls(false);
        native.triggerScreenblurFadeIn(100);
        isFocused = true;
    }
}

alt.on('keydown', async (keyCode: number) => {

    if (keyCode == 84) {
        console.log('adrian')
        view.emit("chat::set_chat_bar_status", true);
        if (alt.isCursorVisible()) alt.showCursor(false);
        alt.showCursor(true);
        alt.toggleGameControls(false);
        new alt.TextLabel("last christmas I gave you my heart", "Monospace", 3, 3, {x:56.19486618041992,y:859.3850708007812,z:197.71343994140625}, {x:56.19486618041992,y:859.3850708007812,z:197.71343994140625}, new alt.RGBA(255, 255, 255, 255), 3, new alt.RGBA(255, 255, 255, 255));
    }

    if (keyCode !== F2_KEY) {
        return;
    }

    if (view) {
        focusWebView();
        return;
    }
    await new Promise((resolve: (...args: any[]) => void) => {
        view.once('load', resolve);
    });

    focusWebView();
});

/* --- EVENTS --- */
view.on("chat::sendChatMessage", (message) => {
    alt.emitServer("chat::send_chat_message", message);
});
view.on("chat::hide_client_chat", () => {
    alt.showCursor(false);
    alt.toggleGameControls(true);
});
view.on("chat::executeChatCommand", (command) => {
    alt.emitServer("chat::execute_server_command", command);
});
view.on("chat::update_chat_data_fontsize", (data) => { alt.LocalStorage.set("fontsize", data); alt.LocalStorage.save() });
view.on("chat::update_chat_data_pagesize", (data) => { alt.LocalStorage.set("pagesize", data); alt.LocalStorage.save() });
view.on("chat::update_chat_data_timestamp", (data) => { alt.LocalStorage.set("timestamp", data); alt.LocalStorage.save() });

alt.onServer("chat::send_chat_messages", (message) => {
    view.emit("chat::send_chat_message", message);
});
alt.onServer("chat::load_connect_chat_data", () => {
    view.emit('chat::update_chat_storage', {
        timeStamp: alt.LocalStorage.get("timestamp"),
        fontSize: alt.LocalStorage.get("fontsize"),
        pageSize: alt.LocalStorage.get("pagesize")
    });
});