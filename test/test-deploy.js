const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

//describe("SimpleStoage",()=>{})
describe("SimpleStorage", function () {
  // let simpleStorageFactory
  // let simpleStorage
  let simpleStorage, simpleStorageFactory;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should start with a favorite number of 0 ", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    //  expect(currentValue.toString()).to.equal(expectedValue)
  });

  it("should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});

// before each and it are part of mocha which is by default also provided by hardhat
// assert and expect are part of chai which is by default also provided by hardhat
// expect and assert perform the same task , depends on user which he wants to use
// there can be nested describe
