exports.handler = async (event, context) => {
    context.succeed({
        Location: 'exp://192.168.0.3:19000'
    });
};