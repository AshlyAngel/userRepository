exports.success = (res, result, head, data) => {
    try {
        res.send({
            head: head,
            content: {
                result: result,
                data: data
            }
        });
    } catch (ex) {
        console.log('error', ex);
    }
};

exports.error = (res, result, head) => {
    try {
        res.send({
            head: head,
            content: {
                result: result
            }
        });
    } catch (ex) {
        console.log(ex);
    }
};
