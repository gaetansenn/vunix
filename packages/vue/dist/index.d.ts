import type { App } from 'vue';
declare const plugin: {
    install(app: App): void;
};
export * from 'vunix-core/dist/runtime/components';
export { plugin as uiVue };
