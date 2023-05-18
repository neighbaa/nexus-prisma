import * as Settings from './settings';
export const settings = Settings.create();
export const changeSettings = (input) => {
    settings.change(input);
};
//# sourceMappingURL=singleton.js.map