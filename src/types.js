// @flow
export type Options = {
  theming?: {
    themeListener: any => any
  },
  inject?: [],
  jss?: any,
  index?: ?number
  };
export type Classes<S> = {|
  [$Keys<S>]: string
|};
