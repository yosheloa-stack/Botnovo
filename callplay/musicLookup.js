// callplay/musicLookup.js
// Resolves a free-text song query to a downloadable mp3 using yt-dlp + ffmpeg.
// Requires the `yt-dlp` and `ffmpeg` binaries to be installed on the host.
const { execFile } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execFileAsync = promisify(execFile);
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

function slugify(str) {
    return (
        String(str)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 60) || 'track'
    );
}

async function lookupAndDownload(query) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });

    // execFile (no shell) => the query is passed as a literal argument,
    // never interpreted by a shell, even if it contains quotes/semicolons/etc.
    const { stdout } = await execFileAsync(
        'yt-dlp',
        ['--no-playlist', '--dump-json', `ytsearch1:${query}`],
        { maxBuffer: 1024 * 1024 * 10 }
    );

    const firstLine = stdout.trim().split('\n')[0];
    if (!firstLine) throw new Error('Nenhum resultado encontrado para essa música.');
    const info = JSON.parse(firstLine);

    const jobId = `${Date.now()}-${slugify(info.title)}`;
    const outputTemplate = path.join(AUDIO_DIR, `${jobId}.%(ext)s`);

    await execFileAsync(
        'yt-dlp',
        ['--no-playlist', '-x', '--audio-format', 'mp3', '-o', outputTemplate, info.webpage_url],
        { maxBuffer: 1024 * 1024 * 10 }
    );

    const fileName = `${jobId}.mp3`;
    const filePath = path.join(AUDIO_DIR, fileName);
    if (!fs.existsSync(filePath)) {
        throw new Error('Falha ao gerar o arquivo de áudio (verifique se o ffmpeg está instalado).');
    }

    return {
        title: info.title,
        duration: info.duration || 0, // seconds
        fileName,
        filePath,
    };
}

module.exports = { lookupAndDownload };
