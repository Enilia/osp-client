import Vue, { VNode, DirectiveOptions } from 'vue'

const emit = (vnode: VNode, name: string, data: any) => {
  const handlers: any = (vnode.data && vnode.data.on) ||
    (vnode.componentOptions && vnode.componentOptions.listeners)

  if (handlers && handlers[name]) {
    handlers[name].fns(data)
  }
}

Vue.directive('osp-width', {
  bind( el, { modifiers }, vnode ) {
    if(modifiers.hide) {
      el.style.visibility = 'hidden'
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      el.style.top = '-9999px'
    }
    emit(vnode, 'osp-width-change', el.offsetWidth)
  },
  componentUpdated( el, { value, oldValue }, vnode ) {
    if( value === oldValue) return
    emit(vnode, 'osp-width-change', el.offsetWidth)
  },
} as DirectiveOptions)
