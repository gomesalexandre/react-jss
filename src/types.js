// @flow
import {JssSheet} from './jss'

export type Options = {
  ...JssSheet.options
};
export type Theme = {};
export type Styles = {[string]: {}};
export type ThemerFn = (theme: Theme) => Styles;
export type StylesOrThemer = Styles | ThemerFn;
export type Classes<S> = {|
  [$Keys<S>]: string
|};
