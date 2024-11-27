import * as sdk from 'node-appwrite'

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

const client = new sdk.Client();

client
 .setEndpoint(process.env.ENDPOINT!)
 .setProject(process.env.PROJECT_ID!)
 .setKey(process.env.API_KEY!);

export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID || '6718e0df002165e8f18f';
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);