import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const image = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageSource = req?.query?.['src']?.toString();
  if (!imageSource) {
    return res.status(500);
  }

  const image = await fetch(imageSource);
  const imageBlob = await image.blob();
  const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

  console.log({
    image,
    imageBlob,
  });
  res.setHeader('Content-Type', 'image/jpeg');

  // @ts-ignore
  res.send(imageBuffer);
};

export const config = {
  api: {
    responseLimit: '8mb',
  },
};

export default image;
