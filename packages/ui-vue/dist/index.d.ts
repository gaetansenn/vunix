import type { App } from 'vue';
declare const plugin: {
    install(app: App): void;
};
export * from 'ui-core/dist/runtime/components';
export { plugin as uiVue };
