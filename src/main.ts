import { createInterface } from 'readline';

const main = () => {
  console.log('好きな数字を入力してください');
  process.stdout.write('> ');

  const reader = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on('line', function (line) {
    console.log('あなたが入力したのは"' + line + '"です');
    console.log('');
    console.log('好きな数字を入力してください');
    process.stdout.write('> ');
  });
};

main();
