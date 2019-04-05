exports.handler = async (event, context) => {
    console.log(event);
    queryPram = 'exp://192.168.0.3:19000' + '?id=' + event.params.querystring.id;
    context.succeed({
        location: queryPram
    });
};