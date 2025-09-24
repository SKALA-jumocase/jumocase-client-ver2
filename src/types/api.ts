// API Request Types
export interface LiquorRecommendationRequest {
  age: number;
  sex: string;
  drinkCount: number;
  userQuery: string;
}

// API Response Types
export interface LiquorRecommendation {
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

// Extended types for UI state management
export interface LiquorRecommendationWithId extends LiquorRecommendation {
  id: number;
}

export interface FormData {
  age: number;
  sex: string;
  drinkCount: number;
  userQuery: string;
}