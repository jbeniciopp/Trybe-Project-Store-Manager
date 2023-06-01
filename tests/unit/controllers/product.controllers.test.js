const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.models");
const productsService = require("../../../src/services/products.services");
const productsController = require("../../../src/controllers/products.controllers");

describe("productsController", () => {
  describe("getAll", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should get all products successfully", async () => {
      // Arrange
      const getAllResult = { message: [{ id: 1 }, { id: 2 }] };
      sinon.stub(productsService, "getAll").resolves(getAllResult);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.getAll(null, res);

      // Assert
      sinon.assert.calledOnce(productsService.getAll);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, getAllResult);
    });
  });

  describe("getById", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should get a specific product by id successfully", async () => {
      // Arrange
      const id = 1;
      const getProductResult = { message: { id: 1 } };
      sinon.stub(productsService, "getById").resolves(getProductResult);
      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.getById(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.getById);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, getProductResult);
    });

    it("should return a 404 error if the product is not found", async () => {
      // Arrange
      const id = 1;
      const getProductResult = { message: "Product not found" };
      sinon.stub(productsService, "getById").resolves(undefined);
      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.getById(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.getById);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: getProductResult.message });
    });
  });

  describe("create", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should create a new product successfully", async () => {
      // Arrange
      const name = "Product 1";
      const createResult = { message: { id: 1, name } };
      sinon.stub(productsService, "newProduct").resolves(createResult);
      const req = { body: { name } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.newProduct(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.newProduct);
      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, createResult);
    });
  });

  describe("update", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should update a product successfully", async () => {
      // Arrange
      const id = 1;
      const name = "Updated Product";
      const updateResult = { message: { id, name } };
      sinon.stub(productsService, "updateProduct").resolves(updateResult);
      const req = { params: { id }, body: { name } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.updateProduct(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.updateProduct);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, updateResult);
    });
  });

  describe("deleteProduct", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should delete a product successfully", async () => {
      // Arrange
      const id = 1;
      const deleteResult = { message: "Product deleted" };
      sinon.stub(productsService, "deleteProducts").resolves(deleteResult);
      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub(),
      };

      // Act
      await productsController.deleteProducts(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.deleteProducts);
      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledOnce(res.end);
    });
  });

  describe("search", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should search for products successfully", async () => {
      // Arrange
      const q = "Product";
      const searchResult = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      sinon.stub(productsService, "search").resolves(searchResult);
      const req = { query: { q } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await productsController.search(req, res);

      // Assert
      sinon.assert.calledOnce(productsService.search);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, searchResult);
    });
  });
});