export const basicAuthorizer = async (event, context, callback) => {
    console.log('Event')
    console.log(event)

    if(event['type'] !== 'TOKEN'){
        callback('Unauthorized');
    }

    const token = event.authorizationToken;
    const encodedCreds = token.split(' ')[1];

    if (encodedCreds === 'null'){
        callback('Unauthorized');
    }

    try {
        const buff = Buffer.from(encodedCreds, 'base64');
        const [username, password] = buff.toString('utf-8').split(':');

        console.log(`username: ${username}, password: ${password}`);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
        const policy = generatePolicy(encodedCreds, event.methodArn, effect)

        callback(null, policy);
    }catch(e) {
       callback(`Unauthorized: ${e.message}`)
    }
};

const generatePolicy = (principalId, resource, effect) => ({
    principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }
        ]
    }
});
