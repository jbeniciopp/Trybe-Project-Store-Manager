const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require('../../../src/models/sales.models')
const productsModel = require('../../../src/models/products.models')
const salesService = require('../../../src/services/sales.services');
const productsController = require('../../../src/controllers/products.controllers');

describe("Sales Controller", () => {
  describe("insertSales", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should newSale a sale and its products successfully", async () => {
      // Arrange
      const itemsSold = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ];
      const idSale = 1;
      const expectedResult = {
        id: idSale,
        itemsSold,
      };
      sinon.stub(salesModel, "newSale").resolves(expectedResult);

      // Act
      const result = await salesService.newSale(itemsSold);

      // Assert
      expect(result).to.deep.equal(expectedResult);

    });
  });

  describe("updateSales", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should update a sale and its products successfully", async () => {
      // Arrange
      const id = 1;
      const itemsSold = [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 2 },
      ];
      const expectedResult = {
        id,
        itemsSold,
      };
      sinon.stub(salesModel, "updateSale").resolves(expectedResult);

      // Act
      const result = await salesService.updateSale(itemsSold);

      // Assert
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe("getAll", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should get all sales successfully", async () => {
      // Arrange
      const getAllResult = [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 2 },
      ];
      sinon.stub(salesModel, "getAll").resolves(getAllResult);

      // Act
      const result = await salesService.getAll();

      // Assert
      expect(result).to.deep.equal(getAllResult);
      sinon.assert.calledOnce(salesModel.getAll);
    });
  });

  describe("getById", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should get a specific sale by id successfully", async () => {
      // Arrange
      const id = 1;
      const returnId = [{ productId: 1, quantity: 3 }];
      sinon.stub(salesModel, "getById").resolves(returnId);

      // Act
      const result = await salesService.getById(id);

      // Assert
      expect(result).to.deep.equal(returnId);
      sinon.assert.calledOnce(salesModel.getById);
    });
  });

  describe("deleteSale", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should delete a sale successfully", async () => {
      // Arrange
      const id = 1;
      sinon.stub(salesModel, "deleteSale").resolves(true);

      // Act
      const result = await salesService.deleteSale(id);

      // Assert
      expect(result).to.deep.equal(true);
      sinon.assert.calledOnce(salesModel.deleteSale);
    });
  });
});