
const mongoose = require("mongoose")
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const express = require('express');
const { kpiRouter } = require("./routes/kpi.route");
const { projectRouter } = require("./routes/project.route");
const { chatRouter } = require("./routes/chat.route");
const { messageRouter } = require("./routes/message.route");
require('dotenv').config();
const stripe = require('stripe')('sk_test_51Nj141DOsxvBXmWQCtDMZyeOlTOtsuDaI2nyz4up6j1YG4nKEvM6SF29Wi0sobNyTich0CStl4iBBC23gvBKyLPc00NX0Rtxnm');
const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const app = express();


mongoose.connect(process.env.MONGODB_URL);
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


app.use("/user", userRouter)
app.use("/kpi", kpiRouter)
app.use("/project", projectRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)

// Initialize an empty Map to track active users
const activeUsers = new Map();

io.on("connection", (socket) => {
    // Add new user
    socket.on("new-user-add", (newUserId) => {
        // Check if user is not added previously
        if (!activeUsers.has(socket.id)) {
            activeUsers.set(socket.id, { userId: newUserId });
            console.log("New User Connected", activeUsers);
        }
        // Send all active users to the new user
        console.log("get-users", Array.from(activeUsers.values()))
        io.emit("get-users", Array.from(activeUsers.values()));
    });

    socket.on("disconnect", () => {
        // Remove user from active users
        if (activeUsers.has(socket.id)) {
            activeUsers.delete(socket.id);
            console.log("User Disconnected", activeUsers);
            // Send all active users to all users
            io.emit("get-users", Array.from(activeUsers.values()));
        }
    });

    // Send a message to a specific user
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        for (const [socketId, user] of activeUsers.entries()) {
            if (user.userId === receiverId) {
                io.to(socketId).emit("receive-message", data);
                break; // Stop searching once the user is found and the message is sent
            }
        }
    });
});




app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
    const item = req.body;
    console.log(req.body)

    const line_items = [
        {
            'price_data': {
                'currency': "usd",
                'product_data': {
                    'name': item.name,
                },
                'unit_amount': item.price * 100,
            },
            'quantity': 1,
        }
    ]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/signup/success`,
        cancel_url: `${YOUR_DOMAIN}/signup`,
    });
    console.log(session, "session")
    if (!session) {
        res.status(500).send({ error: "Something went wrong" })
    }

    // res.redirect(303, session.url)


    res.json({ id: session.id });


});


app.get("/", (req, res) => {
    res.send("hello world")
})








app.listen(5000, () => {
    console.log("server started")
})
