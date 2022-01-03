# CustomSkeleton

This component will show a placeholder box to prevent user loading time frustration <br/>

## What it needs to render

This component needs the following properties

- type: Box type
  - text (default)
  - avatar
  - rectangle
- width: Box width - (100% by default)
- height: Box height (1rem by default)
- color: Box background color (#c1c1c1 by default)

Note that if width property is not used you will need to use a container box.
All elements have a display block.

## How to use it

import React from 'react';
import CustomSkeleton from '../../CustomSkeleton/CustomSkeleton';

const SkeletonTesting = () => {
  return (
    <>
      <CustomSkeleton type='avatar' width={45} height={45}/>
      <CustomSkeleton type='text' width = {250}/>
      <CustomSkeleton type='rectangle' width={250} height={100}/>
    </>  
  );
};

export SkeletonTesting ;
