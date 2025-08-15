import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import Time "mo:base/Time";

actor Auth {

  type UserProfile = {
    pubKeys : [[Nat8]];
    nickname : Text;
    avatar : [Nat8];
    surveyData : Text;
  };

  var profiles : [UserProfile] = [];

  // Порівняння ключів
  func keyEqual(a : [Nat8], b : [Nat8]) : Bool {
    Array.equal<Nat8>(a, b, Nat8.equal)
  };

  func natToBytes(n : Nat) : [Nat8] {
    let bytes : [var Nat8] = Array.init<Nat8>(8, 0);
    for (i in Iter.range(0, 7)) {
      let shift : Nat = 7 - i;
      let shifted : Nat = n / Nat.pow(256, shift);
      bytes[i] := Nat8.fromNat(shifted % 256);
    };
    Array.freeze(bytes)
  };

func nat32ToBytes(n : Nat32) : [Nat8] {
    let mask : Nat32 = Nat32.fromNat(255);
    Array.tabulate<Nat8>(4, func(i) {
        let sh : Nat = 8 * (3 - i);
        let part : Nat32 = (n >> Nat32.fromNat(sh)) & mask;
        Nat8.fromNat(Nat32.toNat(part))
    })
};

  func fnv1a32(bytes : [Nat8]) : Nat32 {
    let FNV_OFFSET_BASIS : Nat32 = 2166136261;
    let FNV_PRIME : Nat32 = 16777619;
    var hash : Nat32 = FNV_OFFSET_BASIS;
    for (b in bytes.vals()) {
      hash := (hash ^ Nat32.fromNat(Nat8.toNat(b))) * FNV_PRIME;
    };
    hash
  };

  public func challenge(pubKey : [Nat8]) : async [Nat8] {
    let nowNat : Nat = Int.abs(Time.now());
    let timeBytes : [Nat8] = natToBytes(nowNat);
    let combined : [Nat8] = Array.append<Nat8>(pubKey, timeBytes);
    let h : Nat32 = fnv1a32(combined);
    nat32ToBytes(h)
  };

  func verifySignature(_pubKey : [Nat8], _signature : [Nat8], _challenge : [Nat8]) : Bool { true };

  public func authenticate(pubKey : [Nat8], _challenge : [Nat8], _signature : [Nat8]) : async Bool {
    var found = false;

    label search for (p in profiles.vals()) {
      if (Array.find<[Nat8]>(p.pubKeys, func(k : [Nat8]) { keyEqual(k, pubKey) }) != null) {
        found := true;
        break search;
      };
    };

    if (not found) {
      let profile : UserProfile = {
        pubKeys = [pubKey];
        nickname = "User";
        avatar = [];
        surveyData = "";
      };
      profiles := Array.append<UserProfile>(profiles, [profile]);
    };

    true
  };

  public query func getProfile(pubKey : [Nat8]) : async ?UserProfile {
    for (p in profiles.vals()) {
      if (Array.find<[Nat8]>(p.pubKeys, func(k : [Nat8]) { keyEqual(k, pubKey) }) != null) {
        return ?p;
      };
    };
    null
  };
};
