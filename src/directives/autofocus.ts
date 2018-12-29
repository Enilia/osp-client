import Vue, { DirectiveOptions } from 'vue';

Vue.directive('autofocus', {
  inserted: function(el) {
    el.focus();
  }
} as DirectiveOptions)
