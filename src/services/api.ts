import axios from "axios";
import type {
  LiquorRecommendationRequest,
  LiquorRecommendation,
  PairingResponse,
  RecommendationRecord,
} from "../types/api";

const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// POST /liquors/recommendations
export const getLiquorRecommendations = async (
  data: LiquorRecommendationRequest,
): Promise<LiquorRecommendation[]> => {
  const response = await api.post("/liquors/recommendations", data);
  return response.data;
};

// GET /liquors/{liquor_id}/pairings
export const getLiquorPairings = async (liquorId: number): Promise<PairingResponse> => {
  const response = await api.post(`/liquors/${liquorId}/pairings`);
  return response.data;
};

// GET /recommendations
export const getAllRecommendations = async (): Promise<RecommendationRecord[]> => {
  const response = await api.get("/recommendations");
  return response.data;
};

export default api;
