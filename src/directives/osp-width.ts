import Vue, { VNode, DirectiveOptions } from 'vue';

const emit = (vnode: VNode, name: string, data: any) => {
  var handlers: any = (vnode.data && vnode.data.on) ||
    (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
}

Vue.directive('osp-width', {
  bind( el, {modifiers} ) {
    if(modifiers.hide) {
      el.style.visibility = 'hidden'
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      el.style.top = '-9999px'
    }
  },
  componentUpdated( el, {value, oldValue}, vnode ) {
    if( value === oldValue) return
    emit(vnode, 'osp-width-change', el.offsetWidth)
  }
} as DirectiveOptions)
