const sinon = require("sinon");

const salesService = require("../../../src/services/sales.services");
const salesController = require("../../../src/controllers/sales.controllers");

describe("Sales Controller", () => {
  describe("createSale", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should create a sale successfully", async () => {
      // Arrange
      const requestBody = {
        // Define the request body here
      };
      const expectedResult = {
        message: {
          // Define the expected result here
        },
      };
      sinon.stub(salesService, "newSale").resolves(expectedResult);
      const req = { body: requestBody };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await salesController.newSale(req, res);

      // Assert
      sinon.assert.calledOnce(salesService.newSale);
      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, expectedResult);
    });
  });

  describe("getAllSales", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should get all sales successfully", async () => {
      // Arrange
      const expectedResult = {
        message: {
          // Define the expected result here
        },
      };
      sinon.stub(salesService, "getAll").resolves(expectedResult);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await salesController.getAll(req, res);

      // Assert
      sinon.assert.calledOnce(salesService.getAll);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, expectedResult);
    });
  });

  describe("getSaleById", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should get a sale by ID successfully", async () => {
      // Arrange
      const saleId = 1;
      const expectedResult = {
        message: {
          // Define the expected result here
        },
      };
      sinon.stub(salesService, "getById").resolves(expectedResult);
      const req = { params: { id: saleId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await salesController.getById(req, res);

      // Assert
      sinon.assert.calledOnce(salesService.getById);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, expectedResult);
    });
  });

  describe("updateSale", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should update a sale successfully", async () => {
      // Arrange
      const saleId = 1;
      const requestBody = {
        // Define the request body here
      };
      const expectedResult = {
        message: {
          // Define the expected result here
        },
      };
      sinon.stub(salesService, "updateSale").resolves(expectedResult);
      const req = { params: { id: saleId }, body: requestBody };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await salesController.updateSale(req, res);

      // Assert
      sinon.assert.calledOnce(salesService.updateSale);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, expectedResult);
    });
  });

  describe("deleteSale", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should return an error if the sale to delete is not found", async () => {
      // Arrange
      const saleId = 1;
      const error = {
        message: "Sale not found",
      };
      sinon.stub(salesService, "deleteSale").resolves(error);
      const req = { params: { id: saleId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Act
      await salesController.deleteSale(req, res);

      // Assert
      sinon.assert.calledOnce(salesService.deleteSale);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, error);
    });
  });
});