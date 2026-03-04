import { useEffect } from "react";
import WebFont from 'webfontloader';
import DefaultButton from "./defaultButton.component";
import { makeImgElement } from "../functions/makeImgElement.functions";

const CoverImage = props => {

    useEffect(()=>{
        WebFont.load({
            google: {
              families: ['Sono']
            }
          });
    },[])

    const containerStyle = {
        marginBottom : '-4px',
        position: 'relative',
    }

    const imgStyle = {
        width : '100%',
    }

    const headerStyle = {
        color: 'white',
        fontFamily: 'sono',
        position: 'relative'
    }

    const textContainerStyle = {
        position:'absolute',
        backgroundColor: 'transparent',
        width: '55%',
        top: '10%',
        left: '5%',
    }

    return(
        <div style={containerStyle}>
            <div style={{...textContainerStyle, ...props.textContainerStyle}}>
                    { props.text && props.text.map( line => {
                    return <h1 
                                key={line}
                                className={props.headerClassName}
                                style={{...headerStyle,...props.headerStyle}}
                            >{line}</h1>
                })}
                {props.button &&
                <DefaultButton 
                    onClick={props.button.onClick}
                    text={props.button.text}
                    style={props.button.style}
                    className={props.button.className}
                    textClassName={props.button.textClassName}/>}
                    
            </div>
            { makeImgElement(props.folder, props.img, imgStyle) }
        </div>
    )
}

export default CoverImage
