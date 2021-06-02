import Pusher from "pusher-js";

export const pusher = new Pusher("7077a8d90e893bdd160b", {
  cluster: "eu",
  encrypted: true,
});
