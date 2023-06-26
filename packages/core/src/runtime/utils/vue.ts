import { App, createVNode, getCurrentInstance, render } from 'vue';

export function mount (componentCtor: any, app: App, props: any, children: any) {
  const container = document ? document.createElement('div') : null
  
  const vm = createVNode(
    {
      render() {
        return createVNode(
          componentCtor,
          props.value,
          children?.value
        )
      },
    },
  )

  if (app) {
    vm.appContext = app._context;
  }

  if (container) {
    // mounted component
    render(vm, container)
  }

  return vm
}