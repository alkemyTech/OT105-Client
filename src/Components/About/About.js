import React, { useState } from 'react';
import MembersList from '../Members/MembersList/MembersList';
import Title from '../Title/Title';
import {
  LinkedinCompanyProfile,
  LinkedinFollowCompany,
  LinkedinLogin,
  LinkedinAddProfile,
  LinkedinProfile,
  LinkedinShare,
  TwitterButton,
  TwitterTweet,
} from 'react-social-plugins';

function About() {
  const mockUpText = {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  };
  const [info, setInfo] = useState(mockUpText.text);

  return (
    <div>
      <div className="container">
        <Title titleText={'Nosotros'} />
        <h4>{info}</h4>
        <MembersList />

        <TwitterTweet theme="light" tweetId="1451372239375540226" width={325} />
      </div>
    </div>
  );
}
export default About;
