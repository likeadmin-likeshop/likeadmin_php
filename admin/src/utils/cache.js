const cache = {

    keyPrev: 'admin_',
	//设置缓存(expire为缓存时效)
	set(key, value, expire) {
		let data = {
			expire: expire ? (this.time() + expire) : "",
			value
		}
		
		if (typeof data === 'object')
			data = JSON.stringify(data);
		try {
            window.localStorage.setItem(key, data)
		} catch (e) {
			return false;
		}
	},
	get(key) {
		try {
			let data =  window.localStorage.getItem(key)
            if(!data) return false
			const {value, expire} = JSON.parse(data)
			if(expire && expire < this.time()) {
				window.localStorage.removeItem(key)
				return false;
			}else {
				return value
			}
		} catch (e) {
			return false;
		}
	},
	//获取当前时间
	time() {
		return Math.round(new Date().getTime() / 1000);
	},
	remove(key) {
		if(key) window.localStorage.removeItem(key)
	},
    getKey(key) {
		return this.keyPrev + key
	}
}

export default cache;
