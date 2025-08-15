import * as bip39 from 'bip39';
import * as ed25519 from '@noble/ed25519';
import * as SecureStore from 'expo-secure-store';
import { getAuthActor } from './icAgent';

const SEED_KEY = 'user_seed';

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

export async function authenticateUser(): Promise<boolean> {
  const keys = await restoreKeys();
  if (!keys) return false;

  const { privKeyHex, pubKey } = keys;
  const pubKeyBytes = Uint8Array.from(Buffer.from(pubKey, 'hex'));

  const actor = getAuthActor();

  const challengeBytes: number[] = await actor.challenge(Array.from(pubKeyBytes));

  const signature = await ed25519.sign(Uint8Array.from(challengeBytes), Buffer.from(privKeyHex, 'hex'));

  const result: boolean = await actor.authenticate(
    Array.from(pubKeyBytes),
    Array.from(challengeBytes),
    Array.from(signature)
  );

  return result;
}

export async function updateUserProfile(
  nickname: string,
  avatarBytes: Uint8Array,
  surveyData: string
) {
  const keys = await restoreKeys();
  if (!keys) return false;

  const pubKeyBytes = Uint8Array.from(Buffer.from(keys.pubKey, 'hex'));

  const actor = getAuthActor();
  const result: boolean = await actor.updateProfile(
    Array.from(pubKeyBytes),
    nickname,
    Array.from(avatarBytes),
    surveyData
  );

  return result;
}
