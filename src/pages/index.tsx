import React, { useState } from 'react';
import Head from 'next/head';
import {
  SampleBox,
  SampleBoxs,
  SampleInlineStyles,
  SampleItem,
  SampleColors,
  SampleFontFamilies,
  SampleFontStyles,
} from '@comp/parts/sample';
import { GetStaticProps } from 'next';
import { Popup } from '@comp/popup/pop';
import { LinkData } from '@comp/links/linkData';
import { SampleFlexBoxs } from '@comp/parts/sample';
import { Dot } from '@comp/dot/dot';
import { Dots } from '@comp/dot/dots';
import { useCharHandler } from '@hooks/useCharHandler';

const Home = () => {
  const [comment, setComment] = useState('');
  const [dot, setDot] = useState([]);
  const { h, x, jamp, moveRight, moveLeft, charElement, controller } = useCharHandler(<Dots size="100px" data={dot} enable={false} />, { enableJamp: true });
  const handleCopy = (text) => {
    setComment(text);
  };
  const links = LinkData();
  return (
    <div className='container max-w-screen-md mx-auto text-sans'>
      <Head>
        <title>Pixel Art</title>
        <meta property='og:title' content='Pixel Art' />
      </Head>

      <div className='w-full content-center text-gray-900 p-4'>
        <div className='sticky text-lg font-bold pt-4'>Pixel Paint</div>
        <div className="select-none">
          <Dots onChange={(data) => { setDot(data) }} />
        </div>
        {/* <div className='sticky text-lg font-bold pt-4'>Pixel Move</div>
        <div className="flex flex-row">
          <div className="relative" style={{ height: '200px' }}>
            {charElement && charElement()}
          </div>
        </div>
        <div className="fixed bottom-0 right-0 p-10">{controller && controller()}</div> */}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {},
  };
}

export default Home;
