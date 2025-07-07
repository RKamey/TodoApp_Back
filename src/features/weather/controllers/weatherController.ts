import type { Request, Response } from "express";
import { weatherService } from "../services/weatherService";
import { sendResponse } from "@common/utils/sendResponse";

const getWeatherByCoords = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return sendResponse(res, 400, "Latitud y longitud son requeridas", null, true);
  }

  try {
    const weather = await weatherService.getWeatherByCoords(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    return sendResponse(res, 200, "Clima obtenido exitosamente", weather);
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    return sendResponse(res, 500, "Error al obtener el clima", null, true);
  }
};

export const weatherController = { getWeatherByCoords };
