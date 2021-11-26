import React from 'react'

//Styles
import s from './Title.module.css'
//MUI
import { Typography } from '@mui/material'

export default function Title({
  titleText, 
  titleTextColor = 'black',
  titleMuiVariant = 'h2', 
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
      <Typography 
      sx={{fontFamily:"Product Sans"}} 
      variant={titleMuiVariant} 
      color={titleTextColor}>{titleText}</Typography>
      {imageUrl &&
        <img 
        className={s.bckg} 
        src={imageUrl} 
        style={{opacity: `${bckgOpacity}`}} 
        alt=""/>
      }
    </div>
  )
}

