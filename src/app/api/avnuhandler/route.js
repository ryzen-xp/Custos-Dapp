import { NextResponse } from 'next/server';
import { executeCalls } from "@avnu/gasless-sdk";

export async function POST(req) {
  try {
    // Log the request to debug
    console.log("Received request:", req);

    // Parse the request body
    const body = await req.json();
    console.log("Parsed body:", body);

    const { account, calls, options } = body;

    // Check if required fields are present
    if (!account || !calls || !options) {
      throw new Error("Missing required fields: account, calls, or options.");
    }

    const modifiedOptions = {
      ...options,
      apiKey: process.env.AVNU_KEY, // Securely use the API key from environment variables
    };

    // Log modified options
    console.log("Modified options:", modifiedOptions);

    const transactionResponse = await executeCalls(account, calls, {}, modifiedOptions);

    // Log the transaction response
    console.log("Transaction response:", transactionResponse);

    // Return the successful response
    return NextResponse.json({ success: true, data: transactionResponse }, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error occurred:", error);

    // Return the error response
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
