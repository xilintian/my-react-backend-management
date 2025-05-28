/**
 * 存储工具类
 * 支持 localStorage、sessionStorage 和 cookie 三种存储方式
 */

const STORAGE_TYPE = {
  LOCAL: "localStorage",
  SESSION: "sessionStorage",
  COOKIE: "cookie",
};

class Storage {
  constructor(type = STORAGE_TYPE.LOCAL) {
    this.type = type;
    this.storage = type === STORAGE_TYPE.COOKIE ? null : window[type];
  }

  /**
   * 设置存储
   * @param {string} key - 存储的键名
   * @param {any} value - 存储的值
   * @param {number} [expire] - 过期时间（秒）
   */
  set(key, value, expire) {
    const data = {
      value,
      time: Date.now(),
      expire: expire ? expire * 1000 : null,
    };

    if (this.type === STORAGE_TYPE.COOKIE) {
      this._setCookie(key, JSON.stringify(data), expire);
    } else {
      this.storage.setItem(key, JSON.stringify(data));
    }
  }

  /**
   * 获取存储
   * @param {string} key - 存储的键名
   * @param {any} [defaultValue] - 默认值
   * @returns {any} 存储的值
   */
  get(key, defaultValue = null) {
    let data;

    if (this.type === STORAGE_TYPE.COOKIE) {
      data = this._getCookie(key);
    } else {
      data = this.storage.getItem(key);
    }

    if (!data) return defaultValue;

    try {
      const parsed = JSON.parse(data);
      const { value, time, expire } = parsed;

      // 判断是否过期
      if (expire && Date.now() - time > expire) {
        this.remove(key);
        return defaultValue;
      }

      return value;
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * 移除存储
   * @param {string} key - 存储的键名
   */
  remove(key) {
    if (this.type === STORAGE_TYPE.COOKIE) {
      this._removeCookie(key);
    } else {
      this.storage.removeItem(key);
    }
  }

  /**
   * 清空所有存储
   */
  clear() {
    if (this.type === STORAGE_TYPE.COOKIE) {
      const keys = this.keys();
      keys.forEach((key) => this._removeCookie(key));
    } else {
      this.storage.clear();
    }
  }

  /**
   * 获取所有存储的键名
   * @returns {string[]} 键名数组
   */
  keys() {
    if (this.type === STORAGE_TYPE.COOKIE) {
      return document.cookie
        .split(";")
        .map((item) => item.split("=")[0].trim());
    }
    return Object.keys(this.storage);
  }

  /**
   * 判断是否存在某个键
   * @param {string} key - 存储的键名
   * @returns {boolean} 是否存在
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * 设置 cookie
   * @private
   */
  _setCookie(key, value, expire) {
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (expire) {
      const date = new Date();
      date.setTime(date.getTime() + expire * 1000);
      cookie += `;expires=${date.toUTCString()}`;
    }
    cookie += ";path=/";
    document.cookie = cookie;
  }

  /**
   * 获取 cookie
   * @private
   */
  _getCookie(key) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieKey, cookieValue] = cookie
        .split("=")
        .map((item) => item.trim());
      if (decodeURIComponent(cookieKey) === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  /**
   * 移除 cookie
   * @private
   */
  _removeCookie(key) {
    this._setCookie(key, "", -1);
  }
}

// 创建三种存储实例
const local = new Storage(STORAGE_TYPE.LOCAL);
const session = new Storage(STORAGE_TYPE.SESSION);
const cookie = new Storage(STORAGE_TYPE.COOKIE);

export { local, session, cookie };
export default local; // 默认导出 localStorage 实例
