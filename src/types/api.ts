// API Request Types
export interface LiquorRecommendationRequest {
  age: number;
  sex: string;
  drinkCount: number;
  userQuery: string;
}

// API Response Types
export interface LiquorRecommendation {
  id: number;
  liquorName: string;
  reason: string;
}

export interface PairingResponse {
  foodName: string;
}

export interface RecommendationRecord {
  id: number;
  age: number;
  sex: string;
  drinkCount: number;
  liquorName: string;
  reason: string;
}

// Extended types for UI state management (now same as LiquorRecommendation since it includes id)
export type LiquorRecommendationWithId = LiquorRecommendation;

export interface FormData {
  age: number;
  sex: string;
  drinkCount: number;
  userQuery: string;
}