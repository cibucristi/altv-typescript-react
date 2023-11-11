import './utility/ipc'; // Used to reconnect, do not remove.
import * as alt from 'alt-server';

import { connectLocalClient } from './utility/reconnect';
import './chat';
import { CommandHandler } from './commandHandler';
import { sendMessage } from './chat';
import { setClockTime, setWeatherTypeNow } from 'natives';

alt.log(`alt:V Server - Boilerplate Started`);
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
    setTimeout(() => {
        console.log('niet')
        blip.attachedTo = player;
    }, 5000);
}

connectLocalClient();

const blip = new alt.PointBlip(56.19486618041992, 859.3850708007812, 197.71343994140625, true);
blip.sprite = 93;
blip.name = "A Very Cool and nasty Bar in Los Santos."
blip.shortRange = true;

new CommandHandler({
    name: 'alabala',
    delay: 4,
    execute(player: alt.Player, args: any[]) {
        console.log(args);
        sendMessage(player, 'FAFAFA', 'Vezi ca esti misto azi.');
        return;
    }
})

new CommandHandler({
    name: 'spawncar',
    execute(player: alt.Player, args: any[]) {
        console.log(args[0]);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have spawned an ${args[0]}.`);

        let spawned_car = new alt.Vehicle(alt.hash(args[0]), player.pos.x, player.pos.y, player.pos.z, 0, 0, player.pos.z);
        spawned_car.numberPlateText = "ADMIN";
        spawned_car.dimension = player.dimension;
        player.setIntoVehicle(spawned_car, 1);
        return;
    }
})

function getWeatherId(weather: string): number {
    const weathers = ["ExtraSunny", "Clear", "Clouds", "Smog", "Foggy", "Overcast", "Rain", "Thunder", "Clearing", "Neutral", "Snow", "Blizzard", "Snowlight", "Xmas", "Halloween"];
    const lowerCaseWeathers = weathers.map(weather => weather.toLowerCase());
    const findRequestedWeather = lowerCaseWeathers.includes(weather.toLowerCase());
    if (!findRequestedWeather) return -1;
    return lowerCaseWeathers.indexOf(weather.toLowerCase());
}


new CommandHandler({
    name: 'setweather',
    execute(player: alt.Player, args: any[]) {
        let weather = getWeatherId(args[0]);
        if (weather == -1) return sendMessage(player, 'fcba03', `Admin: {ffffff}Invalid weather!`), sendMessage(player, 'fcba03', `Available weathers: {ffffff}ExtraSunny, Clear, Clouds, Smog, Foggy, Overcast, Rain, Thunder, Clearing, Neutral, Snow, Blizzard, Snowlight, Xmas, Halloween,`);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have set the weather to ${args[0]}.`);

        player.setWeather(weather);
        player.setDateTime(24, 1, 1994, 7, 0, 0); // 7 AM on January 24, 1994
        return;
    }
})

new CommandHandler({
    name: 'settime',
    execute(player: alt.Player, args: any[]) {
        let hour:any = parseInt(args[0]);
        if (hour < 0 || hour > 23) return sendMessage(player, 'fcba03', `Admin: {ffffff}Invalid time! (0-23)`);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have set the time to ${args[0]}.`);

        player.setDateTime(24, 1, 1994, hour, 0, 0); // 7 AM on January 24, 1994
        return;
    }
})

new CommandHandler({
    name: 'sethealth',
    alias: ["sethp"],
    execute(player: alt.Player, args: any[]) {
        let health:any = parseInt(args[0]);
        if (health < 0 || health > 100) return sendMessage(player, 'fcba03', `Admin: {ffffff}Invalid health! (0-100)`);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have set your health to ${args[0]}.`);
        player.health = health;
        return;
    }
})

new CommandHandler({
    name: 'setarmour',
    alias: ["setarm"],
    execute(player: alt.Player, args: any[]) {
        let health:any = parseInt(args[0]);
        if (health < 0 || health > 100) return sendMessage(player, 'fcba03', `Admin: {ffffff}Invalid armour! (0-100)`);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have set your armour to ${args[0]}.`);
        player.armour = health;
        return;
    }
})

new CommandHandler({
    name: 'setdimension',
    alias: ["setdim"],
    execute(player: alt.Player, args: any[]) {
        let health:any = parseInt(args[0]);
        if (health < 0 || health > 1000) return sendMessage(player, 'fcba03', `Admin: {ffffff}Invalid dimension! (0-1000)`);
        sendMessage(player, 'fcba03', `Admin: {ffffff}You have set your dimension to ${args[0]}.`);
        player.dimension = health;
        return;
    }
})