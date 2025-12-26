import ImageKit from '@imagekit/nodejs';

const clientimageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
});

export default clientimageKit