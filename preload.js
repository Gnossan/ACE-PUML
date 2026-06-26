const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('aceAPI', {});
