const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');
const csv = require('fast-csv');

class PersistStream extends Transform {
    constructor(args) {
        super({ objectMode: true, ...(args || {}) });
        this.batchSize = 100;
        this.batch = [];
        if (args && args.batchSize) {
            this.batchSize = args.batchSize;
        }
    }

    _transform(record, encoding, callback) {
        this.batch.push(record);
        if (this.shouldSaveBatch) {
            // we have hit our batch size to process the records as a batch
            this.processRecords()
                // we successfully processed the records so callback
                .then(() => callback())
                // An error occurred!
                .catch(err => err(err));
            return;
        }
        // we shouldnt persist so ignore
        callback();
    }

    _flush(callback) {
        if (this.batch.length) {
            // handle any leftover records that were not persisted because the batch was too small
            this.processRecords()
                // we successfully processed the records so callback
                .then(() => callback())
                // An error occurred!
                .catch(err => err(err));
            return;
        }
        // no records to persist so just call callback
        callback();
    }

    pushRecords(records) {
        // emit each record for down stream processing
        records.forEach(r => this.push(r));
    }

    get shouldSaveBatch() {
        // this could be any check, for this example is is record cont
        return this.batch.length >= this.batchSize;
    }

    async processRecords() {
        // save the records
        const records = await this.saveBatch();
        // besure to emit them
        this.pushRecords(records);
        return records;
    }

    async saveBatch() {
        const records = this.batch;
        this.batch = [];
        console.log(`Saving batch [noOfRecords=${records.length}]`);
        // This is where you should save/update/delete the records
        return new Promise(res => {
            setTimeout(() => res(records), 100);
        });
    }
}

const processCsv = ({ file, batchSize }) =>
    new Promise((res, rej) => {
        let recordCount = 0;
        fs.createReadStream(file)
            // catch file read errors
            .on('error', err => rej(err))
            .pipe(csv.parse({ headers: true }))
            // catch an parsing errors
            .on('error', err => rej(err))
            // pipe into our processing stream
            .pipe(new PersistStream({ batchSize }))
            .on('error', err => rej(err))
            .on('data', () => {
                recordCount += 1;
            })
            .on('end', () => res({ event: 'end', recordCount }));
    });

const file = path.resolve(__dirname, `batch_write.csv`);
// end early after 30000 records
processCsv({ file, batchSize: 5 })
    .then(({ event, recordCount }) => {
        console.log(`Done Processing [event=${event}] [recordCount=${recordCount}]`);
    })
    .catch(e => {
        console.error(e.stack);
    });
