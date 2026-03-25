const https = require('https');

https.get('https://mr-roan.vercel.app/index.html?t=' + Date.now(), (res) => {
    console.log('Headers for mr-roan.vercel.app:');
    console.log(JSON.stringify(res.headers, null, 2));
}).on('error', (e) => {
    console.error(e);
});
