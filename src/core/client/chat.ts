/* ---- TYPESCRIPT VERSION -----
-                              -
-        REACT.JS CHAT         -
-       CREDITS: Adrian_       -
-                              -
- ---- TYPESCRIPT VERSION -----*/


/* --- IMPORT SECTION --- */
import * as alt from 'alt-client'
import { view } from './webview';


/* --- KEYS --- */
alt.on("keyup", (key: alt.KeyCode) => {
    console.log(key);

    switch (key) {
        case 84: {
            console.log('adrian')
            view.emit("chat::set_chat_bar_status", true);
            if (alt.isCursorVisible()) alt.showCursor(false);
            alt.showCursor(true);
            alt.toggleGameControls(false);
            break;
        }
    }
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