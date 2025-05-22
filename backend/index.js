const express = require('express');
const { Boom } = require('@hapi/boom');
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const { generateCode } = require('./utils/codegen');

const app = express();
const PORT = 3000;
app.use(express.json());

let botInstances = {};
const SESSIONS_DIR = path.join(__dirname, 'sessions');
if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR);

// Generate new 8-digit code
app.get('/generate', (req, res) => {
    const code = generateCode();
    const sessionPath = path.join(SESSIONS_DIR, `${code}.json`);
    fs.writeFileSync(sessionPath, JSON.stringify({}));
    res.json({ code });
});

// Start bot using code
app.post('/connect', async (req, res) => {
    const { code } = req.body;
    const sessionPath = path.join(SESSIONS_DIR, `${code}.json`);
    if (!fs.existsSync(sessionPath)) return res.status(404).json({ error: 'Invalid code' });

    const { state, saveState } = useSingleFileAuthState(sessionPath);

    const sock = makeWASocket({ auth: state });

    botInstances[code] = sock;

    sock.ev.on('connection.update', (update) => {
        if (update.connection === 'open') {
            console.log(`✅ Connected: ${code}`);
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        for (const msg of messages) {
            if (msg.message?.protocolMessage?.type === 2) continue;
            if (msg.message?.extendedTextMessage) {
                console.log(`💬 Seen status: ${msg.key.remoteJid}`);
                await sock.readMessages([msg.key]);
            }
        }
    });

    res.json({ success: true, message: 'Bot connected' });
});

// Get log of bot activity
app.get('/logs/:code', (req, res) => {
    const { code } = req.params;
    res.json({ logs: [`Status auto-seen active for: ${code}`] });
});

app.listen(PORT, () => console.log(`🚀 Server started at http://localhost:${PORT}`));
