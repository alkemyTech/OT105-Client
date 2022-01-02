import React, { useState } from 'react';
import MembersList from '../Members/MembersList/MembersList';
import Title from '../Title/Title';
import s from '../../Styles/AboutStyle/AboutStyle.module.css';
import Personas from '../../assets/foto4.jpg';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography, Box, Fab } from '@mui/material';
import { TwitterTweet } from 'react-social-plugins';

function About() {
  const mockUpText = {
    text: 'Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la educación, salud, trabajo, deporte, responsabilidad y compromiso.',
  };
  const [info, setInfo] = useState(mockUpText.text);

  return (
    <>
      <Title imageUrl={Personas} titleText={'Nosotros'} />
      <div className={s.about_container}>
        <div className={s.container_info}>
          <Typography variant="h4">{'Objetivo'}</Typography>
          <Box
            component="span"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem',
              gap: '2rem',
              justifyContent: 'center',
            }}>
            <Typography variant="h5">{info}</Typography>
          </Box>
          <Typography variant="h4">{'Sobre nosotros'}</Typography>
          <Box
            component="span"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem',
              gap: '2rem',
              justifyContent: 'center',
            }}>
            <Typography variant="h5">
              <p>
                Desde 1997 en <strong>Somos Más</strong> trabajamos con los
                chicos y chicas, mamás y papás, abuelos y vecinos del barrio La
                Cava generando procesos de crecimiento y de inserción social.
                Uniendo las manos de todas las familias, las que viven en el
                barrio y las que viven fuera de él, es que podemos pensar, crear
                y garantizar estos procesos. Somos una asociación civil sin
                fines de lucro que se creó en 1997 con la intención de dar
                alimento a las familias del barrio. Con el tiempo fuimos
                involucrándonos con la comunidad y agrandando y mejorando
                nuestra capacidad de trabajo. Hoy somos un centro comunitario
                que acompaña a más de 700 personas a través de las áreas de:
                Educación, deportes, primera infancia, salud, alimentación y
                trabajo social.&nbsp;
              </p>
            </Typography>
          </Box>
          <Typography variant="h4">{'Miembros del Team'}</Typography>

          <MembersList />

          <Typography variant="h4">{'Ultimos tweets '}</Typography>
          <Box
            component="span"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem',
              gap: '2rem',
              justifyContent: 'center',
            }}>
            <TwitterTweet
              justifyContent="center"
              min-width={300}
              theme="light"
              tweetId="1247299608570736641"
            />
            <TwitterTweet
              justifyContent="center"
              min-width={300}
              theme="light"
              tweetId="1450535690199085058"
            />
            <TwitterTweet
              justifyContent="center"
              min-width={300}
              theme="light"
              tweetId="1271501359658012675"
            />

            <Box
              sx={{
                '& > :not(style)': { m: 1 },
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Fab
                aria-label="add"
                color="success"
                href="https://www.facebook.com/Somos_Más"
                target="_blank">
                <FacebookIcon />
              </Fab>
              <Fab
                aria-label="add"
                color="success"
                href="https://www.instagram.com/SomosMás"
                target="_blank">
                <InstagramIcon />
              </Fab>
              <Fab
                aria-label="add"
                color="success"
                href="https://www.twitter.com/somosmas"
                target="_blank">
                <TwitterIcon />
              </Fab>
              <Fab
                aria-label="add"
                color="success"
                href="https://www.linkedin.com/company/somosmas"
                target="_blank">
                <LinkedInIcon />
              </Fab>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
export default About;
