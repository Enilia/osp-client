
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $socket: {
      emit( event: string, ...args: any[] ): void
    }
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    sockets?: {
      [index: string]: ( ...args: any[] ) => void
    }
  }
}
