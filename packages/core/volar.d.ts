declare module 'vue' {
    export interface GlobalComponents {
      Button: typeof import('@vunix/core')['Button'] 
    }
  }
  export { }