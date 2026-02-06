export const makeImgElement = ( folder, imgTitle, style ) => {
    let img = makeImgUrl( folder, imgTitle )

    return <img key={`${folder}/${imgTitle}`} style={style} src={img}/>
}


export const makeImgUrl = ( folder, imgTitle ) => {
    let img = imgTitle.endsWith('.jpg') ? imgTitle : imgTitle + '.jpg'
    return `${process.env.REACT_APP_CDN_URL}/${folder}/${img}`
}


