const req_interceptors = [] //  請求攔截方法存放
const res_interceptors = [] //  響應攔截方法存放


const Fetch = (option) => {
  if(! option.method) {
    option.method = 'GET'
  }

  req_interceptors.forEach(fn => option = fn(option))

  let url = option.url
  if ( option.method.toUpperCase() === 'GET' && option.params !== null ) {
    url += '?' + ( new URLSearchParams( option.params ) ).toString();
  }
  option.headers = new Headers({
    'Content-Type': 'application/json',
  })
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 3000);

  return new Promise( (resolve, reject) => {
    fetch(url, { ...option, signal: controller.signal })
    .then(res => {
      res_interceptors.forEach(fn => res = fn(res))
      resolve(res)
    })
    .catch(error => {
      reject(error)
    })
  }) 
}

Fetch.interceptors = {
  request: {
    use: (fn) => {
    req_interceptors.push(fn)
      return fn
    }
  },
  response: {
    use: (fn) => {
      res_interceptors.push(fn)
      return fn
    }
  }
}

Fetch.interceptors.request.use(
  (config) =>{
    if (config.method.toUpperCase() === 'POST' ) {
      config.body = JSON.stringify(config.body)
    }
    if (config.method.toUpperCase() === 'DELETE' ) {
      config.body = JSON.stringify(config.body)
    }
    console.group(`%c Request:[${config.url}]`, 'background:#dddddd')
    console.log('Request:', config.body)
    console.groupEnd()
    return config
  },
  (error) =>{
    console.group(
      `%c Request:[${error.config.url}]`,
      'background:#f98686;'
    )
    console.log('Request:', error)
    console.groupEnd()
    return Promise.reject(error)
  }
)

Fetch.interceptors.response.use(
  (res) =>{
    if (res.code === 200 && res.data) {
      return res.data
    }
    console.group(`%c Response:[${res.url}]`, 'background:#96ddb7;')
    console.log('Status:', res.status)
    console.log('Data:', res.data ?? '')
    console.groupEnd()
    return res.json()
  },
  (error) =>{
    console.group(
      `%c Response:[${error.res.url}]`,
      'background:#f98686;'
    )
    console.log('Response:', error)
    console.groupEnd()
    return Promise.reject(error)
  }
)

export const get = (url, params = null) => {
  return Fetch({
    url: url,
    method: 'GET',
    params: params
  })
}
export const post = (url, data) => {
  return Fetch({
    url: url,
    method: 'POST',
    body: data
  })
}
export const put = (url, data) => {
  return Fetch({
    url: url,
    method: 'PUT',
    body: data
  })
}
export const _delete = (url, data) => {
  return Fetch({
    url: url,
    method: 'DELETE',
    body: data
  })
}