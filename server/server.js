import express from 'express';
import fs from 'fs';
import User from './data/user.js';
import Item from './data/item.js';
import Trip from './data/trip.js';

const app = express();
const port = 8080;

app.use(express.json());

let rawData = fs.readFileSync('./data/userList.json');
let userList = JSON.parse(rawData);

const users = {};
userList.forEach(user => {
  users[user.username] = new User(user.username, user.password);
  user.selectedItems.forEach(item => {
    users[user.username].addNewSelectedItem(new Item(item));
  });
});

let itemList = JSON.parse(fs.readFileSync('./data/itemList.json'));

function getAllItems() {
  return itemList;
}

function getUser(username) {
  return users[username];
}

function creatUserAndAddToTrip(username, trip) {
  const newUser = new User(username, "password");
  users[username] = newUser;
  trip.addUser(newUser);
  trips.push(trip);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const trips = [];

app.post("/create-trip", (req, res) => {
  const { username } = req.body;
  const trip = new Trip("");

  creatUserAndAddToTrip(username, trip);

  res.json({ tripId: trip.id });
});

app.post("/join-trip", (req, res) => {
  const { username, tripId } = req.body;
  const trip = trips.find(trip => trip.id === tripId);
  
  if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
  }

  const userAlreadyExistsInTrip = trip.users && trip.users.find(u => u.username === username);
  if (userAlreadyExistsInTrip) {
    return res.json({ success: true });
  }

  creatUserAndAddToTrip(username, trip);

  res.json({ success: true });
});

app.get("/get-remaining-items", (req, res) => {
const { tripId } = req.query;

  const trip = trips.find(t => t.id === tripId);
  const users = trip.users;
  const allItems = getAllItems();
  const itemSelectionMap = {};
  const userSelectionMap = {};
  users.forEach(u => {
    
    if (u.selectedItems) {
      userSelectionMap[u.username] = u.selectedItems.map(item => item.name);
      u.selectedItems.forEach(item => itemSelectionMap[item.name] = u.username);
    }
  });

  res.json({ allItems, userSelectionMap, itemSelectionMap });
});

app.post("/select-items", (req, res) => {
  const { itemsToSelect, username } = req.body;
  const user = getUser(username.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  itemsToSelect.forEach(itemName => {
    const item = new Item(itemName);
    user.addNewSelectedItem(item);
  });
  res.json({ success: true });
});

app.post("/unselect-items", (req, res) => {
  const { username, itemsToUnselect, tripId } = req.body;
  const user = getUser(username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  itemsToUnselect.forEach(itemName => {
    const item = new Item(itemName);
    user.removeSelectedItem(item);
  });

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
