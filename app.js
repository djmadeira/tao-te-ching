const { CosmosClient } = require("@azure/cosmos");
const config = require("./config");
const dbContext = require("./data/databaseContext");
const { taoTeChing } = require('./tao');

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

const run = async () => {
    // Make sure Tasks database is already setup. If not, create it.
    await dbContext.create(client, databaseId, containerId);

    const { resources: items } = await container.items.query({
        query: "SELECT * from c"
    }).fetchAll();

    if (items.length > 0) {
        // Database already created
        console.log('Database already populated');
        return;
    }

    const operations = taoTeChing.map((text, i) => ({
        operationType: 'Create',
        resourceBody: {
            id: `${i+1}`,
            index: `${i+1}`,
            text
        }
    }));

    container.items.bulk(operations);
};

run();
