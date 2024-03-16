const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        // Link expired
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        } 
        const baseUrl = req.originalUrl.slice(0, req.originalUrl.lastIndexOf('/')); // Get the base URL without the UUID
        const downloadLink = `${baseUrl}/download/${file.uuid}`; // Append /download to the base URL
        return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${downloadLink}` });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});


module.exports = router;