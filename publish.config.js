const ghPages =require('gh-pages');
ghPages.publish('dist', {
  branch: 'production',
  repo: 'https://github.com/js2me/opendota-webclient.git'
}, ()=>{
  console.log('OK', arguments);
});
