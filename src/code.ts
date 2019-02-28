import {expect} from 'chai';
import fc from 'fast-check';
import _ from 'underscore';

const fc = require('fast-check');
function symDiff<T>(
  x: Array<T>,
  y: Array<T>
): Array<Array<T>> {
  return [
    _.flatten(x.filter((a) => !_.contains(y, a))),
    _.flatten(y.filter((b) => !_.contains(x, b)))
  ];
}

describe('symDiff', () => {
  it('satisfies the identity property for the first argument', () => {
    fc.assert(fc.property(fc.array(fc.integer()), (anArrayOfNumbers) => {
      const [a, b] = symDiff(anArrayOfNumbers, []);
      expect(a).eql(anArrayOfNumbers);
    }));
  });
  it('satisfies the identity property of the second argument', () => {
    fc.assert(fc.property(fc.array(fc.integer()), (anArrayOfNumbers) => {
      const [a, b] = symDiff([], anArrayOfNumbers);
      expect(b).eql(anArrayOfNumbers);
    }));
  });
  it('satisfies the identity property if the two arguments are identical', () => {
    fc.assert(fc.property(fc.array(fc.integer()), (anArrayOfNumbers) => {
      const [a, b] = symDiff(anArrayOfNumbers, anArrayOfNumbers);
      expect(a.length).eql(0);
      expect(b.length).eql(0);
    }));
  });
});
