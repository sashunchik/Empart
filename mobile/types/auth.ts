import type { ActorMethod } from "@dfinity/agent";

export interface UserProfile {
  nickname: string;
  pubKeys: Array<Uint8Array | number[]>;
  surveyData: string;
  avatar: Uint8Array | number[];
}

export interface _SERVICE {
  authenticate: ActorMethod<
    [Uint8Array | number[], Uint8Array | number[], Uint8Array | number[]],
    boolean
  >;
  challenge: ActorMethod<[Uint8Array | number[]], Uint8Array | number[]>;
  getProfile: ActorMethod<[Uint8Array | number[]], [] | [UserProfile]>;
  updateProfile: ActorMethod<
    [Uint8Array | number[], string, Uint8Array | number[], string],
    boolean
  >;
}
