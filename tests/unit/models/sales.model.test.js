const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const sales = require("../../../src/models/sales.models");

const { allProducts } = require('../mocks');

describe("Sales", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Testando se updateSale atualiza a quantidade de produtos em uma venda", async function () {
    // arrange
    const saleId = 1;
    const itensSold = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 3 },
    ];
    sinon.stub(connection, "execute").resolves([{ affectedRows: 2 }]);

    // act
    const result = await sales.updateSale(itensSold, saleId);

    // assert
    expect(result).to.deep.equal({ saleId, itemsUpdated: itensSold });
  });

  it("Testando se deleteSale remove uma venda com o ID fornecido", async function () {
    // arrange
    const saleId = 1;
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    // act
    const result = await sales.deleteSale(saleId);

    // assert
    expect(result).to.deep.equal(true);
  });

  it("Testando se getAll retorna todas as vendas", async function () {
    // arrange
    sinon.stub(connection, "execute").resolves([allProducts]);

    // act
    const result = await sales.getAll();

    // assert
    expect(result).to.deep.equal(allProducts);
  });
});