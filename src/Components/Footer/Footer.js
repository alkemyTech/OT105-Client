import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const logedIn = true; // Replace with real login info

  return <div>{logedIn ? <NewsletterForm /> : null}</div>;
};

export default Footer;
