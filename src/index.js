import { sun, minue } from './a'
import './index.less';
import chrome from './../static/image/Chrome.png';
const a = 1
const b = 2
const r = sun(a, b)
console.log(r);

const image = new Image()
image.src = chrome

const root = document.createElement('div')
root.classList.add('root')
// root.innerHTML = image

document.body.appendChild(root)

