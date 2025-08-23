import 'react-native-get-random-values';
import { Buffer } from 'buffer';
import * as bip39 from '@scure/bip39';
import { mnemonicToSeed } from '@scure/bip39';
import { sync as ed25519Sync, utils as edUtils } from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2';
import * as SecureStore from 'expo-secure-store';
import { getAuthActor } from './icAgent';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { getRandomValues } from 'expo-crypto';

global.Buffer = Buffer;
edUtils.sha512Sync = (m: Uint8Array) => sha512(m);

if (!(global as any).crypto) (global as any).crypto = {};
if (!(global as any).crypto.getRandomValues) {
  (global as any).crypto.getRandomValues = getRandomValues;
}
(global as any).crypto.subtle = {
  digest: async (_algo: string, data: Uint8Array) => {
    const { sha512 } = await import('@noble/hashes/sha2');
    return sha512(data).buffer;
  },
};

const SEED_KEY = 'user_seed';

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function base64ToBytes(base64: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64, 'base64'));
}

export async function generateSeedAndKeys() {
  try {
    const mnemonic = bip39.generateMnemonic(english, 128);
    const seed = await mnemonicToSeed(mnemonic);
    const privKey = new Uint8Array(Buffer.from(seed.slice(0, 32)));
    const pubKey = ed25519Sync.getPublicKey(privKey);
    const privKeyHex = bytesToHex(privKey);

    await SecureStore.setItemAsync(SEED_KEY, privKeyHex);

    const pubKeyHex = bytesToHex(pubKey);

    return { privKeyHex, pubKey: pubKeyHex };
  } catch (err) {
    throw err;
  }
}

export async function restoreKeys() {
  const privKeyHex = await SecureStore.getItemAsync(SEED_KEY);
  if (!privKeyHex) return null;

  const privKey = hexToBytes(privKeyHex);
  const pubKey = ed25519Sync.getPublicKey(privKey);
  return { privKeyHex, pubKey: bytesToHex(pubKey) };
}

export async function authenticateUser(): Promise<boolean> {
  const keys = await restoreKeys();
  if (!keys) {
    return false;
  }

  const privKey = hexToBytes(keys.privKeyHex);
  const pubKeyBytes = hexToBytes(keys.pubKey);
  const actor = getAuthActor();

  const challengeRaw = await actor.challenge(Array.from(pubKeyBytes));
  const challengeBytes = Uint8Array.from(challengeRaw);

  const signature = ed25519Sync.sign(challengeBytes, privKey);

  const result = await actor.authenticate(
    Array.from(pubKeyBytes),
    Array.from(challengeBytes),
    Array.from(signature)
  );

  return result;
}

export async function updateUserProfile(
  nickname: string,
  avatarBase64: string,
  surveyData: string
) {
  const keys = await restoreKeys();
  if (!keys) return false;

  const pubKeyBytes = hexToBytes(keys.pubKey);
  const avatarBytes = base64ToBytes(avatarBase64);
  const actor = getAuthActor();

  const result = await actor.updateProfile(
    Array.from(pubKeyBytes),
    nickname,
    Array.from(avatarBytes),
    surveyData
  );

  return result as boolean;
}
