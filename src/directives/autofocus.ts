import Vue, { DirectiveOptions } from 'vue'

Vue.directive('autofocus', {
  inserted(el) {
    el.focus()
  },
} as DirectiveOptions)
