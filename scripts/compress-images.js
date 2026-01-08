import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

(async () => {
  await imagemin(['src/assets/**/*.{jpg,jpeg,png,svg}'], {
    destination: 'src/assets-optimized',
    plugins: [
      imageminMozjpeg({ quality: 60 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminSvgo()
    ]
  });
  console.log('✅ Imágenes comprimidas en src/assets-optimized');
})();