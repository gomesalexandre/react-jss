// @flow
export type Options = {
  theming?: {
    themeListener: any => any
  },
  inject?: [],
  jss?: any,
  index?: ?number
};
export type Theme = {};
export type Styles = {[string]: {}};
export type ThemerFn = (theme: Theme) => {};
export type StylesOrThemer = Styles | ThemerFn;
export type Classes<S> = {|
  [$Keys<S>]: string
|};
