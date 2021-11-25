import React from 'react'

//Styles
import s from './Title.module.css'

//MUI
import { Typography } from '@mui/material'

//Title component receives 7 props: text, color, fontSize, imageUrl, bckgColor, bckgOpacity and paddingBlock
//text (required) : The text of the title
//color (optional): Sets the color text of the title. It receives a MUI color. Default: 'black'
//variant (optional): Sets the MUI variant of the text. https://mui.com/api/typography/ for more information. Default: 'h2'
//imageUrl (optional): The URL of the background image.
//bckgColor (optional): This will only work if no imageUrl is provided. Sets the background color of the image. Default: #FAFA88 
//bckgOpacity (optional): Sets the opacity of the background image. Default: '0.7'
//paddingBlock (optional): Sets the padding-block of the Title component. Default: '6rem'


export default function Title({
  text, 
  color = 'black',
  variant = 'h2', 
  imageUrl, 
  bckgOpacity = '0.7',
  paddingBlock = '6rem'
}) {

  const containerStyles = {
    paddingBlock: paddingBlock, 
    background: !imageUrl && '#FAFA88', 
  }


  return (
    <div 
      className={s.container} 
      style={containerStyles}
    >
      <Typography sx={{fontFamily:"Product Sans"}} variant={variant} color={color}>{text}</Typography>
      {imageUrl &&
        <img className={s.bckg} src={imageUrl} style={{opacity: `${bckgOpacity}`}} alt=""/>
      }
      
    </div>
  )
}

