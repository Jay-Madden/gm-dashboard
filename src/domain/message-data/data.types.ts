export enum ReactionType {
  Loved = "Loved",
  Liked = "Liked",
  Disliked = "Disliked",
  Laughed = "Laughed",
  Emphasized = "Emphasized",
  Questioned = "Questioned",
}

export interface Reaction {
  message_id: string;
  author: number;
  date_given: number;
  reaction_type: ReactionType;
}

export interface ReactionCounts {
  author: string | null;
  phoneNumber: number;
  count: number;
}

export interface Message {
  id: string;
  text: string;
  author: number;
  date: number;
  associated_message_guid: string;
  thread_originator_guid: string;
}
