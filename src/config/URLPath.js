const isRelease = window.location.hostname === 'oil-m.tjyunshi.com' || window.location.hostname === 'fish.tjyunshi.com';
const host_ip = isRelease ? 'http://www.tjyunshi.com' : 'http://123.196.126.55:8098';
// const host_ip = isRelease ? 'http://www.tjyunshi.com' : 'http://10.4.32.32:54449';
const URLPath = {
    isRelease: isRelease,
    domain: isRelease ? 'https://oil-m.tjyunshi.com/' : 'https://staging-oil-m.tjyunshi.com/',
    domain_temp: isRelease ? 'https://oil-m.tjyunshi.com' : 'https://staging-oil-m.tjyunshi.com',
    logo_url: 'https://assets.tjyunshi.com/image/lbyl_logo.jpg',
    // backend: 'http://192.168.31.189:8000/wx',
    // backend: 'http://180.76.114.107/wx',
    backend: 'https://api.tjyunshi.com/wx',
    yunshiIP: `${host_ip}`,
    rscIP: host_ip,
    hostIP: `${host_ip}`,
    // ceshiIP:'http://www.tjyunshi.com:8098',
    analytics: 'http://180.76.114.107/api/v1',
    // analytics: 'http://123.196.126.61:8000/analytics',
    wechatpro : isRelease ? 'https://webapi.tjyunshi.com/' : 'https://dev-webapi.tjyunshi.com/',
}
//
module.exports = {URLPath:URLPath}

// scp -r build/* root@123.196.126.61:/data/wwwroot/webapp/
// yunshiIP = isRelease ? 'http://www.tjyunshi.com:8098' : 'http://123.196.126.5
// 5:8098',