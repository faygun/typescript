import {ShipmentListener} from '../shipment';

describe('checkShipmentData', function() {
  it('checkData', function() {
    let listener = new ShipmentListener();
    listener.receiveUpdate("1", 123)
    expect(listener.shipmentData).toBe(1234, "Unexpected value");
  });

  it('checkId', function() {
    let listener = new ShipmentListener();
    listener.receiveUpdate("1", 123)
    expect(listener.shipmentData).toMatch("1", "Unexpected value");
  });
});