const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
var PORT = 4000; //process.env.PORT || 

app.use(cors());

app.listen(PORT, () => {
    console.log("Server works");
});

app.get('/download', (req,res) => {
    var URL = req.query.URL;

    if (req.query.output === 'video') {
        res.header('Content-Disposition', 'attachment; filename="download.mp4"');
        ytdl(URL, {
            format: 'mp4'
        }).pipe(res);
    } 
    else if (req.query.output === 'audio') {
        res.header('Content-Disposition', 'attachment;');
        var stream = ytdl(URL, {
            format: 'mp4'
        });
    
        var command = ffmpeg(stream)
        .noVideo()
        .audioCodec('libmp3lame')
        .on('end', function(){
            console.log('finished')
        })
        .format('mp3')
        .pipe(res)
    }
});