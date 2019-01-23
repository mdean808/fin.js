const K = require('../src/main.js') // change to potash for release

const acceptedProtocols = ['tcp']

const node = new K(acceptedProtocols, acceptedProtocols);
const PORT = 1337;

node.on('ready', async () => {
    console.log('ready from example')

    /* THIS NEEDS TO BE REWRITTEN
        It appears that the createserver and net stuff has already been done in tcp.js
        nothing in here works, at least from the current logs
    */

    // hardcoded private key
    let proxy = node.genCircuit(2, '414a61c8cc5240791fa05e0657e8ca0904f3faf5cd56ab24c29c0bafbb3e572b');

    let server = k.createServer((socket) => {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });
    
    server.listen(PORT, proxy);

    console.log(proxy.hostname); // should b 04bcaaf03b87836c2094b8b844dba8e93bbef93f4534997f

    let client = new k.Socket(proxy);
    client.connect(PORT, '04bcaaf03b87836c2094b8b844dba8e93bbef93f4534997f.k', () => {
        console.log('Connected');
        client.write('Hello, server!\n\nLove, Client.');
    });
});


// listen at port 1337
node.listen(PORT)

