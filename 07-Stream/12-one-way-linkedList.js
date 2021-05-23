/* 
  01 node + head + null 
  02 head --->null 
  03 size 

  04 next element

  05 增加 删除 修改 查询 清空 
*/

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  _getNode(index) {
    if (index < 0 || index >= this.size) throw new Error('cross the border')
    let currentNode = this.head
    let size = 0
    while (size < index) {
      size++
      currentNode = currentNode.next
    }
    return currentNode
  }

  add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) throw new Error('cross the border')

    if (index === 0) {
      const head = this.head
      this.head = new Node(element, head)
    } else {
      const prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++;
  }

  remove(index) {
    let rmNode = null
    if (index === 0) {
      rmNode = this.head
      // 如果Queue一直在删除，会将链表全部清空了，此时会出现rmNode（head）是null的情况，转为undefined作为识别
      if (!rmNode) return undefined
      this.head = rmNode.next
    } else {
      const prevNode = this._getNode(index - 1)
      rmNode = prevNode.next
      prevNode.next = rmNode.next
    }
    this.size--
    return rmNode
  }
  set(index, element) {
    const node = this._getNode(index)
    node.element = element
  }
  get(index) {
    return this._getNode(index)
  }
  clear() {
    this.head = null
    this.size = 0
  }
}

class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  enQueue(data) {
    this.linkedList.add(data)
  }

  dlQueue() {
    return this.linkedList.remove(0)
  }
}


// const l1 = new LinkedList()
// l1.add('node1')
// l1.add('node2')
// l1.add(1, 'node3')
// l1.remove(1)
// l1.set(1, 'node3-3')
// let a = l1.get(0)
// l1.clear()
// console.log(l1)

// const q = new Queue()

// q.enQueue('node1')
// q.enQueue('node2')
// let b = q.dlQueue()
// console.log(b)
// console.log(q)

module.exports = Queue