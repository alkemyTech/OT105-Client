import ReactHtmlParser from 'react-html-parser';

const ActivityContent = ({ content }) => {
  return <div>{ReactHtmlParser(content)}</div>;
};

export default ActivityContent;
