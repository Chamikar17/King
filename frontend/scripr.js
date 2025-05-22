async function connectBot() {
    const code = document.getElementById('codeInput').value;
    if (code.length !== 8) {
        alert('Invalid code!');
        return;
    }

    const res = await fetch('/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    });

    const data = await res.json();
    if (data.success) {
        document.getElementById('logs').innerText = "✅ Bot connected!";
        fetchLogs(code);
    } else {
        alert('Connection failed');
    }
}

async function fetchLogs(code) {
    const res = await fetch(`/logs/${code}`);
    const data = await res.json();
    document.getElementById('logs').innerText += '\n' + data.logs.join('\n');
}
