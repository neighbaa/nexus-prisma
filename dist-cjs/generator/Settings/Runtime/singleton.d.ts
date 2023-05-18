import * as Setset from 'setset';
import * as Settings from './settings';
export declare const settings: Setset.Manager<Settings.Input, Setset.InferDataFromInput<Settings.Input>>;
export declare const changeSettings: (input: Setset.UserInput<Settings.Input>) => void;
