import { useState, useEffect } from 'react';
import { useMediaQuery, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import s from '../../Styles/ToysCampaign/Content.module.css';

const calculateDaysToDate = (dateEnd) => {
  const actualDate = new Date();
  const differenceInMillis = dateEnd.getTime() - actualDate.getTime();
  const differenceInDays = Math.ceil(differenceInMillis / (1000 * 3600 * 24));

  return differenceInDays;
};

const Content = () => {
  const [daysToStart, setDaysToStart] = useState(0);
  const matchesMobile = useMediaQuery('(max-width:480px)');
  const matchesTablet = useMediaQuery('(min-width:480px)');
  const matchesDesktop = useMediaQuery('(min-width:768px)');
  const matchesTv = useMediaQuery('(min-width:1280px)');

  useEffect(() => {
    const dateEnd = new Date('08/01/2022');

    setDaysToStart(calculateDaysToDate(dateEnd));
  }, []);

  return (
    <div className={s.bckg}>
      <div className={s.toysContainer}>
        <p className={s.description}>
          Campaña de recolección de juguetes para colaborar en los festejos del
          día del Niño de las comunidades cercanas.
        </p>
        {matchesMobile && <h3 className={s.dateLabel}>Fecha de inicio:</h3>}
        {matchesTablet && (
          <div className={s.countdownContainer}>
            <h2 className={s.daysToStart}>{daysToStart}</h2>
            <h3 className={s.daysToStartText}>
              días para el inicio de la campaña
            </h3>
          </div>
        )}
        <h4 className={s.dateStart}>
          1 de Agosto de 2022 a partir de las 13:00 hs
        </h4>
        <Chip
          icon={<LocationOnIcon sx={{ fontSize: '1.6rem' }} />}
          label="Barrio La Cava"
          sx={{
            marginBlock: '1.4rem',
            padding: '0.4rem',
            paddingBlock: '1.2rem',
            ['@media (min-width:768px)']: {
              padding: '1.6rem',
              fontSize: '1.4rem',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Content;
