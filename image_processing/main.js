const sharp = require('sharp');
const {v4} = require('uuid');
const db = require('../models/model');

class Resize {
    constructor(Image, folder){
        this.Image = Image
        this.folder = folder
    }

    generateFilename () {
        const filename = v4()
        return filename;
    }

    imageValidation (metadata) {
        const {width, height, format} = metadata;
        if (width >= 1080 && height >= 760 && format == 'jpeg' || 'jpg' || 'png' || 'gif') {
            return true
        }
        return false
    }
    async resizeAndSaveProfilePicture (filename) {
        const image = await sharp(this.Image).resize(70,70).jpeg().toFile(`${this.folder}/${filename}-profile.jpeg`);
        return image
    }

    async resizeAndSaveStandardPicture (filename) {
        const image = await sharp(this.Image).resize(1080,760).jpeg().toFile(`${this.folder}/${filename}-standard.jpeg`);
        return image
    }

    async resizeAndSaveSquarePicture (filename) {
        const image = await sharp(this.Image).resize(1080,1080).jpeg().toFile(`${this.folder}/${filename}-square.jpeg`);
        return image
    }
    
    async saveFileNameToDB (user_id, filename) {
        await db.User.update(
            {link : filename},{where : {id : user_id}
        }).then(data=> console.log(data))
        .catch(err =>{throw err})
            return filename
    }   
    }

module.exports = Resize;