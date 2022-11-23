const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) =>{
    const imgSplited = imgUrl.split('/'); //Dividimos nuestra url en un array por el separado '/'
    const nameSplited = imgSplited[imgSplited.length - 1].split('.'); //Hacemos split del ultimo elemento del array para obtener el nombre
    const folder = imgSplited[imgSplited.length - 2]; //Obtenemos el penultimo elemento de la url que es el nombre de la carpeta
    const imgToDelete = `${folder}/${nameSplited[0]}`;  //obtenemos el filename que da cloudinary a nuestra imagen
    console.log(imgToDelete);
    cloudinary.uploader.destroy(imgToDelete, () => console.log("Image deleted in cloudinary")); //la borramos de cloudimary
}

module.exports = {deleteFile};