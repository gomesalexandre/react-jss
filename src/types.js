// @flow
import {JssSheet, create} from './jss'

export type Options = {
  ...JssSheet.options,
  theming: {
    themeListener: any => any,
  },
  inject: Array<'classes' | 'themes' | 'sheet'>,
  jss: create
};
export type Theme = {};
export type Styles = {[string]: {}};
export type ThemerFn = (theme: Theme) => Styles;
export type StylesOrThemer = Styles | ThemerFn;
export type Classes<S> = {|
  [$Keys<S>]: string
|};
