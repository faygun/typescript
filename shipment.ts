import {Mutex} from 'async-mutex';

async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any)
}

//avoid lock
const mutex = new Mutex();

// this class can be export because I need this for unit test.
export class ShipmentListener implements ShipmentUpdateListenerInterface{
    id: string
    shipmentData: any
    
    async receiveUpdate(id: string, shipmentData: any){
        this.id = id;
        this.shipmentData = shipmentData;
        
        console.log(`Start ${id}`)

        const release = await mutex.acquire();

        await new ShipmentSearchIndex().updateShipment(id, shipmentData)

        release();
    }
}

//Execute
const shipment = new ShipmentListener()
shipment.receiveUpdate("1", 111)
shipment.receiveUpdate("1", 222)
shipment.receiveUpdate("1", 333)
shipment.receiveUpdate("2", 444)
shipment.receiveUpdate("2", 555)
shipment.receiveUpdate("2", 666)
shipment.receiveUpdate("3", 777)
shipment.receiveUpdate("3", 888)




