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
    <div className={s.toysContainer}>
      <p>
        Campaña de recolección de juguetes para colaborar en los festejos del
        día del Niño de las comunidades cercanas.
      </p>
      {matchesMobile && <h3 className={s.dateLabel}>Fecha de inicio:</h3>}
      {matchesTablet && (
        <>
          <h2 className={s.daysToStart}>{daysToStart}</h2>
          <h3>días para el inicio de la campaña</h3>
        </>
      )}
      <h4 className={s.dateStart}>1 de Agosto 2022 a partir de las 13:00 hs</h4>
      <Chip
        icon={<LocationOnIcon color="success" />}
        label="Barrio La Cava"
        sx={{
          marginBlock: '1.4rem',
          padding: '0.4rem',
          paddingBlock: '1.2rem',
        }}
      />
    </div>
  );
};

export default Content;
