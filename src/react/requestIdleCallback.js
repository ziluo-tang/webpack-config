const sleep = (delay) => {
  const start = Date.now()
  while (Date.now() - start < delay) {}
}
const tasks = [
  () => {
    console.log('第一个任务开始')
    sleep(15)
    console.log('第一个任务结束')
  },
  () => {
    console.log('第二个任务开始')
    sleep(5)
    console.log('第二个任务结束')
  },
  () => {
    console.log('第三个任务开始')
    sleep(20)
    console.log('第三个任务结束')
  },
  () => {
    console.log('第四个任务开始')
    sleep(10)
    console.log('第四个任务结束')
  },
]
const start = Date.now()
const worker = (deadline) => {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    tasks.length > 0
  ) {
    tasks.shift()()
    console.log(Date.now() - start)
    if (deadline.timeRemaining()) {
      console.log('继续执行')
    } else {
      console.log('时间不够了，下次执行')
    }
  }
  if (tasks.length) {
    window.requestIdleCallback(worker, { timeout: 1000 })
  }
}

window.requestIdleCallback(worker, { timeout: 1000 })


