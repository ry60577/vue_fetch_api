# 使用 fetch 建立api攔截器

## 目錄
- [Purpose](#purpose)
- [Environment](#environment)
- [The way call api(api.js)](#the-way-call-api)

## Purpose
Using fetch interceptors to send api request instead of axios

使用 fetch 方式，封裝interceptors 發送 api request來代替axios

## Environment
Vue 3

## Folder Structure
![](https://i.imgur.com/3AueY10.png)

## The way call api
```
//  api.js
import * as request from './request'

const IP_HOST = 'https://api.ipify.org'
const PERSON_HOST = 'https://api.genderize.io'

export const apiGetIP = () => request.get(IP_HOST, { format: 'json' })
export const apiGetPersonInfo = () => request.get(`${PERSON_HOST}`, { name: 'astrid' })
```
![](https://i.imgur.com/BBKZYh9.png)