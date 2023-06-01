const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const Mock = require("../mocks");

const { getAll, getById } = require("../../../src/models/products.models");

describe("Products", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Testando se GET /products/:id retorna o produto com o id passado", async function () {
    // arrange
    sinon.stub(connection, "execute").resolves([
      [
        {
          id: 1,
          name: "Iphone 13 pro",
        },
      ],
    ]);

    // act
    const result = await getById(1);

    // assert
    expect(result).to.be.an("object");
    expect(result).to.deep.equal({
      id: 1,
      name: "Iphone 13 pro",
    });
  });

  it("Testando se GET /products retorna todos os produtos", async function () {
    // arrange
    sinon.stub(connection, "execute").resolves([
      [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
      ],
    ]);

    // act
    const result = await getAll();

    // assert
    expect(result).to.be.an("array").that.has.lengthOf(3);
    expect(result[0]).to.deep.equal({ id: 1, name: "Product 1" });
    expect(result[1]).to.deep.equal({ id: 2, name: "Product 2" });
    expect(result[2]).to.deep.equal({ id: 3, name: "Product 3" });
  });
});