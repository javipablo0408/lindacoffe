import { NextResponse } from "next/server";

const PLACE_ID = "ChIJ..."; // Place ID de Google Maps (se puede obtener de la URL)
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";

export async function GET() {
  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key no configurada" },
      { status: 500 }
    );
  }

  try {
    // Obtener detalles del lugar incluyendo reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: "Error al obtener reviews de Google" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reviews: data.result.reviews || [],
      rating: data.result.rating || 0,
      totalReviews: data.result.user_ratings_total || 0
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { error: "Error al obtener reviews" },
      { status: 500 }
    );
  }
}

