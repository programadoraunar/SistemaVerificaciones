import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const countries = await res.json();
    console.log(countries);
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.error();
  }
}
