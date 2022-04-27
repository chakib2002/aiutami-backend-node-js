const sharp = require('sharp');
const Resize = require('./main')

exports.processImage = async(req, res, next) =>{
    try{
    const id = await req.user.id;
    const uploadedImage = new Resize(req.file.buffer, 'uploads');
    const filename = uploadedImage.generateFilename();
    const metadata = await sharp(uploadedImage.Image).metadata();
    const validation = uploadedImage.imageValidation(metadata);
    if(validation){
        const saveProfile = await uploadedImage.resizeAndSaveProfilePicture(filename);
        const saveStandard = await uploadedImage.resizeAndSaveStandardPicture(filename);
        if(saveProfile && saveStandard){
            const response = await uploadedImage.saveFileNameToDB(id, filename)
            await res.status(200).json({
                    message :"Image uploaded successfully",
                    ProfilePictureSrc : response 
                })
            }else{
                res.status(500).json({Error : "failed to upload the picture please try again"})
            }

        } 
    }catch (error) {
        res.status(500).json({Error : "An error has occured"})
    }
}
