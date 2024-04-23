
import { ipcMain } from 'electron';
import { getUsers } from './get-user.js';

ipcMain.on('get-users', async (event) => {
    const users = await getUsers();
    event.reply('reply_get-users', users);
});