import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const logedIn = true;

  return <div>{logedIn && <NewsletterForm />}</div>;
};

export default Footer;
