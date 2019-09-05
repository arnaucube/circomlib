const chai = require("chai");
const assert = chai.assert;

const bigInt = require("snarkjs").bigInt;
const poseidon = require("../src/poseidon.js");

describe('poseidon primitives', () => {
  it('poseidon two bigInt', () => {
    const poseidonHash = poseidon.createHash();
    const h1 = poseidonHash([bigInt(1), bigInt(2)]);
    assert.equal(h1.toString(), '12242166908188651009877250812424843524687801523336557272219921456462821518061');

    const h2 = poseidonHash([bigInt(3), bigInt(4)]);
    assert.equal(h2.toString(), '17185195740979599334254027721507328033796809509313949281114643312710535000993');
  });

  it('poseidon bigInt array (multiHash)', () => {
    const msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const msgBuff = Buffer.from(msg, 'utf-8');
    const n = 31;
    const msgArray = [];
    const fullParts = Math.floor(msgBuff.length / n);
    for (let i = 0; i < fullParts; i++) {
      const v = bigInt.leBuff2int(msgBuff.slice(n * i, n * (i + 1)));
      msgArray.push(v);
    }
    if (msgBuff.length % n !== 0) {
      const v = bigInt.leBuff2int(msgBuff.slice(fullParts * n));
      msgArray.push(v);
    }
    let h = poseidon.multiHash(msgArray);
    assert.equal(h.toString(), '11821124228916291136371255062457365369197326845706357273715164664419275913793');

  });
  it('poseidon hash buffer', () => {
    const msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const msgBuff = Buffer.from(msg, 'utf-8');
    let h = poseidon.hashBuffer(msgBuff);
    assert.equal(h.toString(), '11821124228916291136371255062457365369197326845706357273715164664419275913793');
  });
});
