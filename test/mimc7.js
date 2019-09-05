const chai = require("chai");
const assert = chai.assert;

const bigInt = require("snarkjs").bigInt;
const mimc7 = require("../src/mimc7.js");

describe('mimc7 primitives', () => {
  it('hash two bigInt', () => {
    const h = mimc7.hash(bigInt(12), bigInt(45));
    assert.equal(h.toString(), '19746142529723647765530752502670948774458299263315590587358840390982005703908');
  });
  it('hash bigInt array (multiHash)', () => {
    const h1 = mimc7.multiHash([bigInt(12)]);
    assert.equal(h1.toString(), '16051049095595290701999129793867590386356047218708919933694064829788708231421');

    const h2 = mimc7.multiHash([bigInt(78), bigInt(41)]);
    assert.equal(h2.toString(), '2938611815373543102852102540059918590261345652613741345181300284995514063984');

    const h4 = mimc7.multiHash([bigInt(12), bigInt(45)]);
    assert.equal(h4.toString(), '9949998637984578981906561631883120271399801229641312099559043216173958006905');

    const h5 = mimc7.multiHash([bigInt(12), bigInt(45), bigInt(78), bigInt(41)]);
    assert.equal(h5.toString(), '18226366069841799622585958305961373004333097209608110160936134895615261821931');
  });

  it('mimc7 hash buffer', () => {
    const msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const msgBuff = Buffer.from(msg, 'utf-8');
    let h = mimc7.hashBuffer(msgBuff);
    assert.equal(h.toString(), '16855787120419064316734350414336285711017110414939748784029922801367685456065');
  });
});
