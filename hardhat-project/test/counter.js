const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
  });

  it("should start with count 0", async function () {
    const count = await counter.get();
    expect(count).to.equal(0);
  });

  it("should increment count", async function () {
    await counter.inc();
    const count = await counter.get();
    expect(count).to.equal(1);
  });

  it("should decrement count", async function () {
    await counter.inc(); // count = 1
    await counter.dec(); // count = 0
    const count = await counter.get();
    expect(count).to.equal(0);
  });

  it("should not allow decrement below 0", async function () {
    await expect(counter.dec()).to.be.revertedWith(
      "Counter: cannot decrement below zero"
    );
  });

  it("should reset count to 0", async function () {
    await counter.inc();
    await counter.inc(); // count = 2
    await counter.reset(); // count = 0
    const count = await counter.get();
    expect(count).to.equal(0);
  });
});
