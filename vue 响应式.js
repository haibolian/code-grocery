function defineReactive(obj, key, val){
  observe(obj[key])

  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      // 添加 watcher
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      console.log('change');
      if(val !== newVal){
        val = newVal
        dep.notice()
      }
    }
  })
}

function observe(obj){
  if(typeof obj !== 'object' || obj === null) return
  
  Object.keys(obj).forEach(key=>{
    defineReactive(obj,key,obj[key])
  })
}

function proxy(vm){
  Object.keys(vm.$data).forEach(key=>{
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(val) {
        if(val !== vm.$data[key]) vm.$data[key] = val
      }
    })
  })
}

class Vue {
  constructor(options){
    this.$options = options
    this.$data = options.data

    observe(this.$data)

    proxy(this)
  
    new Compile(this.$options.el, this)
    
  }
}

class Compile {
  constructor(el, vm){
    this.$el = document.querySelector(el)
    this.$vm = vm

    this.compile(this.$el)
  }

  compile(el){

    el.childNodes.forEach(node=>{
      if(node.nodeType === 1) {
        this.compileElement(node)
      }else if( node.nodeType === 3 && this.isMustache(node.textContent)) {
        this.compileText(node)
      }
    })
  }

  isMustache(str) {
    return /\{\{(.*)\}\}/.test(str)
  }

  compileElement(node){
    let attrs = node.attributes
    Object.values(attrs).forEach(attr=>{
      const attrName = attr.name
      const attrValue = attr.value
      if(attrName.startsWith('v-')){
        const dir = attrName.substr(2)
        this[dir] && this[dir](node, attrValue, dir)
        // this.update(node, attrValue, dir) 
      }
    })

    if(node.childNodes) this.compile(node)
  }

  compileText(node){
    this.update(node, RegExp.$1.trim(), 'text')
  }

  text(node, key, dir){
    this.update(node, key, dir)
  }

  textUpdate(node, value){
    node.textContent =value
  }

  html(node, key, dir){
    this.update(node, key, dir)
  }

  htmlUpdate(node, value){
    node.innerHTML = value
  }

  model(node, key){
    node.oninput = ()=>{
      this.$vm[key] = node.value
    }
  }

  update(node, key, exp){
    const fn = this[exp + 'Update']
    fn && this.$vm[key] && fn(node, this.$vm[key])
    new Watcher(this.$vm, key, val=>{
      fn(node, val)
    })
  }
}

class Dep {
  constructor(){
    this.dep = []
  }

  addDep(watcher){
    this.dep.push(watcher)
  }

  notice(){
    this.dep.forEach(watcher=>watcher.update())
  }
}

class Watcher {
  constructor(vm, key, updateFunc){
    this.$vm = vm
    this.$key = key
    this.$updateFunc = updateFunc
    
    Dep.target = this
    vm[key]
    Dep.target = null
  }

  update(){
    let newVal = this.$vm[this.$key]
    this.$updateFunc(newVal)
  }
}