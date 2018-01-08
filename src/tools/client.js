import cookie from 'react-cookie'

let cookieConfig = {
	path: '/',
    // domain: 'xiaoYown.io',
	maxAge: 295000
}
export function saveCookie(name, value, config ) {
    cookie.save(name, value, config ? config : cookieConfig)
}

export function getCookie(name) {
    return cookie.load(name)
}

export function removeCookie(name, config) {
    cookie.remove(name, config ? config : cookieConfig)
}
export function removeCookieAll() {
    Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name,cookieConfig))
}
export function signOut(config) {
    cookie.remove('session', config ? config : cookieConfig)
}

export function isLogin() {
    return !!cookie.load('SSIONID')
}


