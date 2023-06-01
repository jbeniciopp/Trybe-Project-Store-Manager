const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.models");
const productsServices = require("../../../src/services/products.services");

describe("Products Controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Testando getAll retorna todos os produtos", async function () {
    // arrange
    const expectedResult = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ];
    sinon.stub(productsModel, "getAll").resolves(expectedResult);

    // act
    const result = await productsServices.getAll();

    // assert
    expect(result).to.deep.equal(expectedResult);
    
  });

  it("Testando getById retorna o produto com o ID fornecido", async function () {
    // arrange
    const productId = 1;
    const product = { id: productId, name: "Product 1" };
    sinon.stub(productsModel, "getById").resolves(product);

    // act
    const result = await productsServices.getById(productId);

    // assert
    expect(result).to.deep.equal(product);
  });

  it("Testando newProduct cria um novo produto", async function () {
    // arrange
    const productName = "New Product";
    const productId = 1;
    const expectedProduct = { id: productId, name: productName };
    sinon.stub(productsModel, "newProduct").resolves(expectedProduct);

    // act
    const result = await productsServices.newProduct(productName);

    // assert
    expect(result).to.deep.equal(expectedProduct);
  });

  it("Testando updateProduct atualiza o produto com o ID fornecido", async function () {
    // arrange
    const productId = 1;
    const productName = "Updated Product";
    const updatedProduct = { id: productId, name: productName };
    sinon.stub(productsModel, "updateProduct").resolves(updatedProduct);

    // act
    const result = await productsServices.updateProduct(productName, productId);

    // assert
    expect(result).to.deep.equal(updatedProduct);
  });

  it("Testando search retorna os produtos filtrados pelo nome", async function () {
    // arrange
    const searchQuery = "Product";
    const allProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    sinon.stub(productsModel, "search").resolves(allProducts);
    const expectedResult = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];

    // act
    const result = await productsServices.search(searchQuery);

    // assert
    expect(result).to.deep.equal(expectedResult);
  });

  it("Testando search retorna todos os produtos se a consulta for vazia", async function () {
    // arrange
    const searchQuery = "";
    const allProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    sinon.stub(productsModel, "search").resolves(allProducts);

    // act
    const result = await productsServices.search(searchQuery);

    // assert
    expect(result).to.deep.equal(allProducts);
  });
});