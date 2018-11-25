const today = new Date();

let day1 = {
    date: today,
    schedule: [{
            type: "Appendectomy",
            name: "John Doe",
            location: "OP206",
            time: "12:00",
        },
        {
            type: "Other Surgery",
            name: "Jane Doe",
            location: "OP201",
            time: "13:30",
        },
    ]
};
let day2 = {
    date: today,
    schedule: [{
        type: "Appendectomy",
        name: "John Doe",
        location: "OP206",
        time: "12:00",
    }, ],
};

let data = [day1, day2, ];


exports.handler = (event, context, callback) => {
    callback(null, data);
}
