import { useEffect } from "react"
import { makeImgElement } from "../functions/makeImgElement.functions"

const ArticleImgs = props => {
    const imgContainer = {
        display : 'flex',
        margin: '2vw 5vw',
        justifyContent: 'center',
        width: '90vw',
        // margin: '1vw',
        // marginBottom: '0.5vw'
    }
    const singleImg = {
        width : '90%',
        borderRadius: '4px'
    }
    const sideBySideImg = {
        width: 'auto',
        height: '100%',
        margin: '0 0.5vw',
        borderRadius: '4px'
    }

    switch (props.imgs.length) {
        case 1:
           return (<>
           { 
                <div style={imgContainer}>
                    { makeImgElement(props.folder, props.imgs[0], singleImg) }
                </div>
            }
            </>) 
        case 2:
        default:
            return (
            <div style={{...imgContainer,height:'30vw'}}>
                {
                    props.imgs.map( imgString => {
                        return makeImgElement(props.folder, imgString, sideBySideImg)
                    })
                }
            </div>
            ) 
    }
    
}

export default ArticleImgs


