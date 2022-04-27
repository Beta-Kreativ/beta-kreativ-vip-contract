const BetaKreativVip = artifacts.require("BetaKreativVip");

contract("BetaKreativVip", (accounts) => {
  printAccounts = {};
  accounts.forEach((a) => {
    printAccounts[accounts.indexOf(a)] = a;
  });
  console.log(printAccounts);

  it("should deploy", async () => {
    contract = await BetaKreativVip.new({
      from: accounts[0],
    });

    console.log("contract", contract.address);
  });

  it("can mint", async () => {
    await contract.mint(accounts[0], 100);
    const bal = await contract.balanceOf(accounts[0]);

    assert.equal(bal, 100);
  });

  it("can drop", async () => {
    const quantity = 10;

    await contract.airdrop([accounts[1], accounts[2]], quantity);

    const bal1 = await contract.balanceOf(accounts[1]);
    const bal2 = await contract.balanceOf(accounts[2]);

    assert.equal(bal1, quantity);
    assert.equal(bal2, quantity);
  });

  it("base uri works", async () => {
    const baseURI = "ipfs://465b76n8797n6b785674655v5cbdv/";
    const tokenId = 10;

    await contract.setBaseURI(baseURI);
    const tokenUri = await contract.tokenURI(tokenId);

    assert.equal(baseURI + tokenId, tokenUri);
  });
});
