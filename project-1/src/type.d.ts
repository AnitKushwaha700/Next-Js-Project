import { Connection } from "mongoose";

declare global {                              // it contains only the type declaratios. There is no value only declarations 
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};
