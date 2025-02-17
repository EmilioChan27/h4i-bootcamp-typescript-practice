import mongoose from "mongoose";
import { Schema } from 'mongoose';

export type BookDrive = {
  driveName: string;
  driveCode: string,
  organizer: string,
  startDate: string,
  country: string,
  status: number,
  booksGoal: number,
  completedDate: Date,
  mailDate: Date,
  gs: { fundraise: String, terms: boolean },
  cb: { booksCurrent: number, updateFreq: number, lastUpdate: Date },
  pts: {
    intFee: number, domFee: number, materials:
      { boxes: boolean, extraCardboard: boolean, tape: boolean, mailingLabels: boolean }
  },
  fl: { 
    isFinalized: boolean,
    shipments: number[],
   },

}

export const BookDriveSchema = new Schema<BookDrive>({
  driveName: { type: String },
  driveCode: { type: String },
  organizer: { type: String },
  startDate: { type: String },
  country: { type: String },
  completedDate: { type: Date },
  status: { type: Number },
  booksGoal: { type: Number },
  mailDate: {type: Date},
  gs: {
    fundraise: { type: String },
    terms: { type: Boolean },
  },
  cb: {
    booksCurrent: { type: Number },
    updateFreq: { type: Number },
    lastUpdate: { type: Date },
  },
  pts: {
    intFee: { type: Number },
    domFee: { type: Number },
    materials: {
      boxes: { type: Boolean },
      extraCardboard: { type: Boolean },
      tape: { type: Boolean },
      mailingLabels: { type: Boolean },
    },
  },
  fl: {
    isFinalized: { type: Boolean },
    shipments: { type: [String] },
  },
},
  { collection: "bookDrive" }
);

function getBookDriveModel() {
  if ("BookDrive" in mongoose.models) return mongoose.models.BookDrive;
  return mongoose.model("BookDrive", BookDriveSchema);
}
export default getBookDriveModel;
