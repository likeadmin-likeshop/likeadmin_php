const cache = {

    key: 'cache_',
	//设置缓存(expire为缓存时效)
	set(key, value, expire) {
		key = this.getKey(key)
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
		key = this.getKey(key)
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
		key = this.getKey(key)
		window.localStorage.removeItem(key)
	},
    getKey(key) {
		return this.key + key
	},
	setKey(key) {
		this.key = key + '_'
	}
}

export default cache;
