const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        let time = new Date(decoded.exp * 1000);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);
/* GET user foo. */
router.get(
  "/foo",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      res.status(200).json({ message: "Foo" });
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length? users.users[users.users.length - 1].id + 1: 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

  let rooms = {
      list: [
        { "id": 1,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Siriluck","surname": "Raksawat","checkin": "14/04/64" ,"duedate": "14/07/64" ,"number": "101"},
        { "id": 2,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Benjamas","surname": "Kaewsiri","checkin": "15/02/64" ,"duedate": "15/05/64" ,"number": "102"},
        { "id": 3,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Phitpichai","surname": "Sakulsiri","checkin": "18/01/64" ,"duedate": "18/04/64" ,"number": "103"},
        { "id": 4,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Phatama","surname": "Sirichaiwong","checkin": "20/02/64" ,"duedate": "20/05/64" ,"number": "104"},
        { "id": 5,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Anuphong","surname": "Kaewkul","checkin": "1/08/64" ,"duedate": "1/08/64" ,"number": "105"},
        { "id": 6,"img":"https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461", "name": "Suriya","surname": "Namatham","checkin": "3/07/64" ,"duedate": "3/07/64" ,"number": "106"},
      ]
    }
  
  
  router
    .route("/rooms")
    .get((req, res) => {
      res.send(rooms);
    })
    .post((req, res) => {
      console.log(req.body);
      let newroom = {};
      newroom.id = rooms.list.length ? rooms.list[rooms.list.length - 1].id + 1 : 1;
      newroom.name = req.body.name;
      newroom.surname= req.body.surname;
      newroom.checkin = req.body.checkin;
      newroom.duedate = req.body.duedate;
      newroom.number= req.body.number;
      newroom.img = req.body.img;
      rooms = { list: [...rooms.list, newroom] };
      res.json(rooms);
    });
  
  router
    .route("/rooms/:roomid")
    .get((req, res) => {
      let id = rooms.list.findIndex((item) => +item.id == +req.params.roomid)
      res.json(rooms.list[id]);
    })
    .put((req, res) => {
      let id = rooms.list.findIndex((item) => item.id == +req.params.roomid);
      rooms.list[id].name = req.body.name;
      rooms.list[id].surname = req.body.surname;
      rooms.list[id].checkin = req.body.checkin;
      rooms.list[id].duedate = req.body.duedate;
      rooms.list[id].number = req.body.number;
      rooms.list[id].img = req.body.img;
      res.json(rooms.list);
    })
    .delete((req, res) => {
      rooms.list = rooms.list.filter((item) => +item.id !== +req.params.roomid);
      res.json(rooms.list);
    });
  
  
  router.route("/purchase/:roomId")
  .post((req,res) => {
    let id = rooms.list.findIndex((item) => +item.id == +req.params.roomId)
    if (id == -1) {
      res.json({message: "Not found"})
    }
    else {
      rooms.list = rooms.list.filter((item) => +item.id !== +req.params.roomId);
      res.json(rooms.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));