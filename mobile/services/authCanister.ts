import * as bip39 from 'bip39';
import * as ed25519 from '@noble/ed25519';
import * as SecureStore from 'expo-secure-store';

const SEED_KEY = 'user_seed';

const CANISTER_API_BASE = 'https://canister-url';

export async function generateSeedAndKeys() {
  const mnemonic = bip39.generateMnemonic(128);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const privKey = seed.slice(0, 32);
  const pubKey = await ed25519.getPublicKey(privKey);

  await SecureStore.setItemAsync(SEED_KEY, Buffer.from(privKey).toString('hex'));

  return {
    mnemonic,
    pubKey: Buffer.from(pubKey).toString('hex'),
  };
}

export async function restoreKeys() {
  const privKeyHex = await SecureStore.getItemAsync(SEED_KEY);
  if (!privKeyHex) return null;

  const privKey = Buffer.from(privKeyHex, 'hex');
  const pubKey = await ed25519.getPublicKey(privKey);

  return {
    privKeyHex,
    pubKey: Buffer.from(pubKey).toString('hex'),
  };
}

export async function requestChallenge(pubKeyHex: string): Promise<Uint8Array> {
  const response = await fetch(`${CANISTER_API_BASE}/challenge?pubKey=${pubKeyHex}`);
  if (!response.ok) throw new Error('Failed to get challenge');
  const challengeHex = await response.text();
  return Uint8Array.from(Buffer.from(challengeHex, 'hex'));
}

export async function signChallenge(privKeyHex: string, challenge: Uint8Array): Promise<Uint8Array> {
  const privKey = Buffer.from(privKeyHex, 'hex');
  return await ed25519.sign(challenge, privKey);
}

export async function authenticateUser(): Promise<boolean> {
  const privKeyHex = await SecureStore.getItemAsync(SEED_KEY);
  if (!privKeyHex) return false;

  const pubKey = await ed25519.getPublicKey(Buffer.from(privKeyHex, 'hex'));
  const pubKeyHex = Buffer.from(pubKey).toString('hex');

  const challenge = await requestChallenge(pubKeyHex);
  const signature = await signChallenge(privKeyHex, challenge);

  const response = await fetch(`${CANISTER_API_BASE}/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pubKey: pubKeyHex,
      challenge: Buffer.from(challenge).toString('hex'),
      signature: Buffer.from(signature).toString('hex'),
    }),
  });

  if (!response.ok) throw new Error('Failed to authenticate');

  const result = await response.json();
  return result.success === true;
}

export async function updateUserProfile(
  pubKeyHex: string,
  nickname: string,
  avatarBase64: string,
  surveyData: string
): Promise<boolean> {
  const response = await fetch(`${CANISTER_API_BASE}/updateProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pubKey: pubKeyHex, nickname, avatar: avatarBase64, surveyData }),
  });

  if (!response.ok) throw new Error('Failed to update profile');

  const result = await response.json();
  return result.success === true;
}
