/* eslint-disable */

/*
 A fluid interface for rewiring dependencies using the 'babel-rewire-plugin'.

 For example, to replace two dependencies in a module:

 const spy = stubbedFunction().returns("Hi Sam").forArguments("Sam");
 within(module)
 .replace('dependencyA').with(spy)
 .replace('dependencyB').with('foobar');
 */
export const within = object => {
  const stubs = [];
  const replace = {
    replace: name => ({
      with: value => {
        stubs.push(name);
        object.__Rewire__(name, value);
        return replace;
      },
    }),
    reset: (name = '') =>
      stubs
        .filter(n => (name ? n === name : true))
        .forEach(stub => object.__ResetDependency__(stub)),
  };

  return replace;
};
