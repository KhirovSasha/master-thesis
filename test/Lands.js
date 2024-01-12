const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lands Contract", function () {
  let landsContract;
  let owner;
  let addr1;
  let addr2;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Lands = await ethers.getContractFactory("Lands");
    landsContract = await Lands.deploy();
    await landsContract.deployed();
  });

  it("Should set the owner correctly", async function () {
    const contractOwner = await landsContract.getOwner();
    expect(contractOwner).to.equal(owner.address);
  });

  it("Should add a new object", async function () {
    await landsContract.createObject(
      "New Company",
      "New Title",
      400,
      "1234567890:12:345:6789",
      0  // LegalStatus.AgriculturalLands
    );

    const object = await landsContract.getObject(1); // Assuming there were 0 objects initially
    expect(object.companyName).to.equal("New Company");
    expect(object.title).to.equal("New Title");
    expect(object.area).to.equal(400);
  });

  it("Should not allow non-owners to delete an object", async function () {
    await expect(
      landsContract.connect(addr1).deleteObject(1) // Try to delete the first object
    ).to.be.revertedWith("Caller is not the owner");

    const objectCount = await landsContract.getObjectCount();
    expect(objectCount).to.equal(1); // There should be only 1 object after adding it in the previous test
  });
  
});
