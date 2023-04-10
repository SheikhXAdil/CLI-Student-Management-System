#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import { taskWhileLoggedOut } from "./loggedout.js";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const welcome = async () => {
    console.clear();
    const rainbowTitle = chalkAnimation.rainbow('Welcome to my student management system \n');
    await sleep();
    rainbowTitle.stop();
};
await welcome();
await taskWhileLoggedOut();
