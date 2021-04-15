/**
 * firstUpdate => {payload, nextUpdate} => {payload, nextUpdate} => ... => lastUpdate
 */

class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null
    this.firstUpdate = null
    this.lastUpdate = null
  }
  enqueueUpdate(update) {
    if (this.firstUpdate) {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    } else {
      this.firstUpdate = update
      this.lastUpdate = update
    }
  }
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      const nextState =
        typeof currentUpdate.payload === 'function'
          ? currentUpdate.payload(currentState)
          : currentUpdate.payload
      currentState = { ...currentState, ...nextState }
      currentUpdate = currentUpdate.nextUpdate
    }
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState
  }
}

const queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: 'tangxiaoxin' }))
queue.enqueueUpdate(new Update({ number: 0 }))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
console.log(queue.forceUpdate())
